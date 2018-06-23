pragma solidity 0.4.24;

import "./Authorizable.sol";

/** @title Transaction Registry - Stores a list of pending transactions */
/** @author Kerman Kohli - <kerman@TBD.com> */

contract TransactionRegistry is Authorizable {

    struct Payment {
        address subscriptionContract;

        uint dueDate;
        uint amount;
        uint lastPaymentDate;

        address claimant;
        uint executionPeriod;
    }

    // The bytes32 key is the subscription identifier
    mapping (bytes32 => Payment) public payments;

    uint public multiplier;

    event PaymentCreated(bytes32 _subscriptionIdentifer);
    event PaymentProcessed(bytes32 _subscriptionIdentifer);
    event PaymentClaimantRemoved(bytes32 _subscriptionIdentifer);
    event PaymentCancelled(bytes32 _subscriptionIdentifer);

    /**
      * PUBLIC FUNCTIONS
    */
    /** @dev Set a multiplier for how many tokens you need in order to claim
      * proportional to the payments.
      * @param _amount is the multiplier that would like to be set.
    */
    function setMultiplier(uint _amount) public onlyOwner {

        // Ensure the multiplier is positive
        require(_amount > 0);
        multiplier = _amount;

    }

    /** @dev Create a new payment object when a user initially subscribes to a
      * plan.
      * @param _subscriptionContract is the contract where the details exist
      * (adheres to Collectible contract interface).
      * @param _subscriptionIdentifier is the identifier of that customer's
      * subscription with its relevant details.
      * @param _dueDate is when the payment is meant to be paid by.
      * @param _amount is how much the processors has staked in order to have
      * the right to process the transaction.
    */
    function createNewPayment(
        bytes32 _subscriptionIdentifier, // solhint-disable-line
        address _subscriptionContract, // solhint-disable-line
        uint _dueDate, // solhint-disable-line
        uint _amount) // solhint-disable-line
        public
        onlyAuthorized
        returns (bool success)
    {

        // @TODO: Implementation
        return false;

    }

    /** @dev Process the payment
      * @param _subscriptionIdentifier is the identifier of that customer's
      * subscription with it's relevant details.
    */
    function processPayment(bytes32 _subscriptionIdentifier)
        public
        onlyAuthorized
        returns (bool success)
    { // solhint-disable-line

        // @TODO: Implementation

    }

    /** @dev Allows a claimant to cancel their responsibility to process a
      * transaction
      * @param _subscriptionIdentifier is the identifier of that customer's
      * subscription with it's relevant details.
    */
    function removeClaimant(bytes32 _subscriptionIdentifier)
        public
        onlyAuthorized
        returns (bool success)
    { // solhint-disable-line

        // @TODO: Implementation

    }

    /** @dev A payment was cancelled by the business or user
      * @param _subscriptionIdentifier is the identifier of that customer's
      * subscription with it's relevant details.
    */
    function cancelPayment(bytes32 _subscriptionIdentifier)
        public
        onlyAuthorized
        returns (bool sucess)
    { // solhint-disable-line

        // @TODO: Implementation

    }

    /** @dev Get the infromation about a payment
      * @param _subscriptionIdenitifer is the identifier of that customer's
      * subscription with it's relevant details.
    */
    function getPaymentInformation(bytes32 _subscriptionIdenitifer)
        public
        view
        returns (
            address subscriptionContract,   // 0
            uint dueDate,                   // 1
            uint lastPaymentDate,           // 2
            uint amount,                    // 3
            address claimant,               // 4
            uint executionPeriod            // 5
        )
    { // solhint-disable-line

        // @TODO: Implementation

    }

}
