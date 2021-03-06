pragma solidity 0.4.24;

import "./Authorizable.sol";
import "./base/token/ERC20.sol";
import "./base/math/SafeMath.sol";

/** @title Stake Contract - Processors stake tokens to claim transactions */
/** @author Kerman Kohli - <kerman@8xprotocol.com> */

contract StakeContract is Authorizable {

    using SafeMath for uint256;

    struct Stake {
        uint256 lockedUp;
        uint256 total;
    }

    struct TokenStake {
        uint256 lockedUp;
        uint256 total;
    }

    mapping (address => mapping (address => Stake)) public userStakes;
    mapping (address => TokenStake) tokenStakes;

    ERC20 public tokenContract;

    event Locked(address indexed staker, address indexed tokenAddress, uint256 indexed amount);
    event Unlocked(address indexed staker, address indexed tokenAddress, uint256 indexed amount);
    event Slashed(address indexed staker, address indexed tokenAddress, uint256 indexed amount);
    event Transferred(address indexed staker, address indexed tokenAddress, uint256 indexed amount, address destination);
    event ToppedUp(address indexed staker, address indexed tokenAddress, uint256 indexed amount);
    event Withdrew(address indexed staker, address indexed tokenAddress, uint256 indexed amount);

    event GiniCoefficientUpdated(address indexed tokenAddress, uint256 indexed gini);
    event DivideTotalUpdated(address indexed tokenAddress, uint256 indexed divideBy);

    /**
      * PUBLIC FUNCTIONS
    */
    constructor(address _tokenAddress) public {
        tokenContract = ERC20(_tokenAddress);
    }

    /** @dev When the processor claims a transaction their tokens are staked.
      * @param _staker is the processors who is staking thier tokens.
      * @param _tokenAddress token for which to stake for.
      * @param _amount is how much they would like to stake;
    */
    function lockTokens(address _staker, address _tokenAddress, uint256 _amount)
        public
        onlyAuthorized
    {
        // @TOOD: Use local memory variable
        require(getAvailableStake(_staker, _tokenAddress) >= _amount, "You cannot lock more tokens than you have available");
        userStakes[_staker][_tokenAddress].lockedUp = userStakes[_staker][_tokenAddress].lockedUp.add(_amount);
        tokenStakes[_tokenAddress].lockedUp = tokenStakes[_tokenAddress].lockedUp.add(_amount);

        emit Locked(_staker, _tokenAddress, _amount);
    }

    /** @dev When a processor executes a transaction their tokens are unstaked.
      * @param _staker is the processors who is staking thier tokens.
      * @param _tokenAddress token for which to unlock for.
      * @param _amount is how much they would like to unstake;
    */
    function unlockTokens(address _staker, address _tokenAddress, uint256 _amount)
        public
        onlyAuthorized
    {
        // Ensure that they can't unstake more than they actually have
        require(userStakes[_staker][_tokenAddress].lockedUp >= _amount, "You cannot unstake more tokens than you actually have");
        userStakes[_staker][_tokenAddress].lockedUp = userStakes[_staker][_tokenAddress].lockedUp.sub(_amount);
        tokenStakes[_tokenAddress].lockedUp = tokenStakes[_tokenAddress].lockedUp.sub(_amount);

        emit Unlocked(_staker, _tokenAddress, _amount);
    }

    /** @dev When the processor doesn't execute a transaction they claimed
      * their tokens are slashed.
      * @param _staker is the processors who's tokens need to be slashed.
      * @param _tokenAddress token for which to slash for.
      * @param _amount is how many tokens need to be slashed.
    */
    function slashTokens(address _staker, address _tokenAddress, uint256 _amount)
        public
        onlyAuthorized
    {
        // Make sure that an authorized address can't slash more tokens than
        // they actually have locked up.
        require(userStakes[_staker][_tokenAddress].lockedUp >= _amount, "You cannot slash more tokens than they actually have");

        // Reduce the total amount first
        userStakes[_staker][_tokenAddress].total = userStakes[_staker][_tokenAddress].total.sub(_amount);
        userStakes[_staker][_tokenAddress].lockedUp = userStakes[_staker][_tokenAddress].lockedUp.sub(_amount);
        tokenStakes[_tokenAddress].total = tokenStakes[_tokenAddress].total.sub(_amount);
        tokenStakes[_tokenAddress].lockedUp = tokenStakes[_tokenAddress].lockedUp.sub(_amount);

        emit Slashed(_staker, _tokenAddress, _amount);
    }

    /** @dev When someone catches out another user for not processing
      * their tokens are transferred to them.
      * @param _staker is the processors who's tokens need to be slashed.
      * @param _tokenAddress token for which to stake for.
      * @param _amount is how many tokens need to be slashed.
      * @param _destination is the person to transfer the stake to.
    */
    function transferStake(address _staker, address _tokenAddress, uint256 _amount, address _destination)
        public
        onlyAuthorized
    {
        // Make sure that an authorized address can't slash more tokens than
        // they actually have locked up.
        require(userStakes[_staker][_tokenAddress].lockedUp >= _amount, "You can't transfer more tokens than they have locked up");

        // Reduce the total amount first
        userStakes[_staker][_tokenAddress].total = userStakes[_staker][_tokenAddress].total.sub(_amount);
        userStakes[_staker][_tokenAddress].lockedUp = userStakes[_staker][_tokenAddress].lockedUp.sub(_amount);

        // Transfer the stake
        userStakes[_destination][_tokenAddress].total = userStakes[_destination][_tokenAddress].total.add(_amount);
        userStakes[_destination][_tokenAddress].lockedUp = userStakes[_destination][_tokenAddress].lockedUp.add(_amount);

        emit Transferred(_staker, _tokenAddress, _amount, _destination);
    }

    /** @dev Check how many tokens the processor has in total at this moment.
      * @param _staker is the processor address.
      * @param _tokenAddress token for which to return details for.
    */
    function getTotalStake(address _staker, address _tokenAddress)
        public
        view
        returns (uint256 total)
    {
        return userStakes[_staker][_tokenAddress].total;
    }

    /** @dev Check how many tokens the processor has available at this moment.
      * @param _staker is the processor address.
      * @param _tokenAddress token for which to return details for.
    */
    function getAvailableStake(address _staker, address _tokenAddress)
        public
        view
        returns (uint256 available)
    {
        return (userStakes[_staker][_tokenAddress].total.sub(userStakes[_staker][_tokenAddress].lockedUp));
    }

    /** @dev Check how many tokens the processor has locked at this moment.
      * @param _staker is the processor address.
      * @param _tokenAddress token for which to return details for.
    */
    function getLockedStake(address _staker, address _tokenAddress)
        public
        view
        returns (uint256 locked)
    {
        return userStakes[_staker][_tokenAddress].lockedUp;
    }

    /** @dev Check how many staked tokens the currency has in total at this moment.
      * @param _tokenAddress token for which to return details for.
    */
    function getTotalTokenStake(address _tokenAddress)
        public
        view
        returns (uint256 total)
    {
        return tokenStakes[_tokenAddress].total;
    }

    /** @dev Check how many tokens the currency has available at this moment.
      * @param _tokenAddress token for which to return details for.
    */
    function getAvailableTokenStake(address _tokenAddress)
        public
        view
        returns (uint256 available)
    {
        return (tokenStakes[_tokenAddress].total.sub(tokenStakes[_tokenAddress].lockedUp));
    }

    /** @dev Check how many tokens the currency has locked at this moment.
      * @param _tokenAddress token for which to return details for.
    */
    function getLockedTokenStake(address _tokenAddress)
        public
        view
        returns (uint256 locked)
    {
        return tokenStakes[_tokenAddress].lockedUp;
    }

    /** @dev Get the details of the token stake struct.
      * @param _tokenAddress token for which to return details for.
    */
    function getTokenStakeDetails(
        address _tokenAddress
    )
        public
        view
        returns (
            uint256 total,
            uint256 lockedUp
        )
    {
        TokenStake memory tokenStake = tokenStakes[_tokenAddress];

        return(
            tokenStake.total,
            tokenStake.lockedUp
        );
    }


    /** @dev Top up your stake once you've given approval to transfer funds.
      * @param _amount is how much you would like to withdraw.
      * @param _tokenAddress token for which to stake for.
    */
    function topUpStake(uint256 _amount, address _tokenAddress)
        public
        returns (bool success)
    {
        if (tokenContract.transferFrom(msg.sender, address(this), _amount)) {
            userStakes[msg.sender][_tokenAddress].total = userStakes[msg.sender][_tokenAddress].total.add(_amount);
            tokenStakes[_tokenAddress].total = tokenStakes[_tokenAddress].total.add(_amount);
            return true;
        } else {
            return false;
        }

        emit ToppedUp(msg.sender, _tokenAddress, _amount);
    }

    /** @dev Withdraw your stake from the stake contract.
      * @param _amount is how much you would like to withdraw.
      * @param _tokenAddress token for which to withdraw for.
    */
    function withdrawStake(uint256 _amount, address _tokenAddress)
        public
    {
        // Check that they're not taking out more than they actually have.
        require(getAvailableStake(msg.sender, _tokenAddress) >= _amount, "You cannot withdrwa more than you have available");

        userStakes[msg.sender][_tokenAddress].total = userStakes[msg.sender][_tokenAddress].total.sub(_amount);
        tokenStakes[_tokenAddress].total = tokenStakes[_tokenAddress].total.sub(_amount);
        tokenContract.transfer(msg.sender, _amount);

        emit Withdrew(msg.sender, _tokenAddress, _amount);
    }

}