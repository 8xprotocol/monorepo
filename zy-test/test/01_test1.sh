#!/bin/bash
# ----------------------------------------------------------------------------------------------
# Testing the smart contract
#
# Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2017. The MIT Licence.
# ----------------------------------------------------------------------------------------------

MODE=${1:-test}

GETHATTACHPOINT=`grep ^IPCFILE= settings.txt | sed "s/^.*=//"`
PASSWORD=`grep ^PASSWORD= settings.txt | sed "s/^.*=//"`

SOURCEDIR=`grep ^SOURCEDIR= settings.txt | sed "s/^.*=//"`

EIGHTEXTOKENSOL=`grep ^EIGHTEXTOKENSOL= settings.txt | sed "s/^.*=//"`
EIGHTEXTOKENJS=`grep ^EIGHTEXTOKENJS= settings.txt | sed "s/^.*=//"`

DEPLOYMENTDATA=`grep ^DEPLOYMENTDATA= settings.txt | sed "s/^.*=//"`

INCLUDEJS=`grep ^INCLUDEJS= settings.txt | sed "s/^.*=//"`
TEST1OUTPUT=`grep ^TEST1OUTPUT= settings.txt | sed "s/^.*=//"`
TEST1RESULTS=`grep ^TEST1RESULTS= settings.txt | sed "s/^.*=//"`
JSONSUMMARY=`grep ^JSONSUMMARY= settings.txt | sed "s/^.*=//"`
JSONEVENTS=`grep ^JSONEVENTS= settings.txt | sed "s/^.*=//"`

CURRENTTIME=`date +%s`
CURRENTTIMES=`perl -le "print scalar localtime $CURRENTTIME"`
START_DATE=`echo "$CURRENTTIME+45" | bc`
START_DATE_S=`perl -le "print scalar localtime $START_DATE"`
END_DATE=`echo "$CURRENTTIME+60*1.5" | bc`
END_DATE_S=`perl -le "print scalar localtime $END_DATE"`
BIDDINGPERIOD=`echo "60" | bc`
RECOVERYPERIOD=`echo "60*1.5" | bc`


printf "MODE               = '$MODE'\n" | tee $TEST1OUTPUT
printf "GETHATTACHPOINT    = '$GETHATTACHPOINT'\n" | tee -a $TEST1OUTPUT
printf "PASSWORD           = '$PASSWORD'\n" | tee -a $TEST1OUTPUT
printf "SOURCEDIR          = '$SOURCEDIR'\n" | tee -a $TEST1OUTPUT
printf "EIGHTEXTOKENSOL   = '$EIGHTEXTOKENSOL'\n" | tee -a $TEST1OUTPUT
printf "EIGHTEXTOKENJS    = '$EIGHTEXTOKENJS'\n" | tee -a $TEST1OUTPUT
printf "DEPLOYMENTDATA     = '$DEPLOYMENTDATA'\n" | tee -a $TEST1OUTPUT
printf "INCLUDEJS          = '$INCLUDEJS'\n" | tee -a $TEST1OUTPUT
printf "TEST1OUTPUT        = '$TEST1OUTPUT'\n" | tee -a $TEST1OUTPUT
printf "TEST1RESULTS       = '$TEST1RESULTS'\n" | tee -a $TEST1OUTPUT
printf "JSONSUMMARY        = '$JSONSUMMARY'\n" | tee -a $TEST1OUTPUT
printf "JSONEVENTS         = '$JSONEVENTS'\n" | tee -a $TEST1OUTPUT
printf "CURRENTTIME        = '$CURRENTTIME' '$CURRENTTIMES'\n" | tee -a $TEST1OUTPUT
printf "START_DATE         = '$START_DATE' '$START_DATE_S'\n" | tee -a $TEST1OUTPUT
printf "END_DATE           = '$END_DATE' '$END_DATE_S'\n" | tee -a $TEST1OUTPUT

# Make copy of SOL file and modify start and end times ---
# `cp modifiedContracts/SnipCoin.sol .`
`cp $SOURCEDIR/$EIGHTEXTOKENSOL .`

# --- Modify parameters ---
# `perl -pi -e "s/START_DATE \= 1525132800.*$/START_DATE \= $START_DATE; \/\/ $START_DATE_S/" $CROWDSALESOL`
# `perl -pi -e "s/endDate \= 1527811200;.*$/endDate \= $END_DATE; \/\/ $END_DATE_S/" $CROWDSALESOL`

DIFFS1=`diff $SOURCEDIR/$EIGHTEXTOKENSOL $EIGHTEXTOKENSOL`
echo "--- Differences $SOURCEDIR/$EIGHTEXTOKENSOL $EIGHTEXTOKENSOL ---" | tee -a $TEST1OUTPUT
echo "$DIFFS1" | tee -a $TEST1OUTPUT

solc_0.4.24 --version | tee -a $TEST1OUTPUT

echo "var eightExTokenOutput=`solc_0.4.24 --optimize --pretty-json --combined-json abi,bin,interface $EIGHTEXTOKENSOL`;" > $EIGHTEXTOKENJS


geth --verbosity 3 attach $GETHATTACHPOINT << EOF | tee -a $TEST1OUTPUT

loadScript("$EIGHTEXTOKENJS");
loadScript("functions.js");

var eightExTokenAbi = JSON.parse(eightExTokenOutput.contracts["$EIGHTEXTOKENSOL:EightExToken"].abi);
var eightExTokenBin = "0x" + eightExTokenOutput.contracts["$EIGHTEXTOKENSOL:EightExToken"].bin;

console.log("DATA: eightExTokenAbi=" + JSON.stringify(eightExTokenAbi));
console.log("DATA: eightExTokenBin=" + JSON.stringify(eightExTokenBin));

unlockAccounts("$PASSWORD");
printBalances();
console.log("RESULT: ");


var msg = null;
// -----------------------------------------------------------------------------
msg = "Deploy eightExToken";
// -----------------------------------------------------------------------------
console.log("RESULT: ----- " + msg + " -----");
var eightExTokenContract = web3.eth.contract(eightExTokenAbi);
var eightExTokenTx = null;
var eightExTokenAddress = null;
var currentBlock = eth.blockNumber;
var eightExToken = eightExTokenContract.new( 
  {from: contractOwnerAccount, data:eightExTokenBin, gas: 6000000, gasPrice: defaultGasPrice},
  function(e, contract) {
    if (!e) {
      if (!contract.address) {
        eightExTokenTx = contract.transactionHash;
      } else {
        eightExTokenAddress = contract.address;
        addAccount(eightExTokenAddress, "8x Token");
        console.log("DATA: eightExTokenAddress=" + eightExTokenAddress);
      }
    }
  }
);
while (txpool.status.pending > 0) {
}
addTokenContractAddressAndAbi(eightExTokenAddress, eightExTokenAbi);
printBalances();
failIfTxStatusError(eightExTokenTx, msg);
printTxData("eightExTokenTx", eightExTokenTx);
console.log("RESULT: ");




exit;





EOF
grep "DATA: " $TEST1OUTPUT | sed "s/DATA: //" > $DEPLOYMENTDATA
#cat $DEPLOYMENTDATA
grep "RESULT: " $TEST1OUTPUT | sed "s/RESULT: //" > $TEST1RESULTS
#cat $TEST1RESULTS
