"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requirements = {
    "contractName": "Requirements",
    "abi": [
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_gini",
                    "type": "uint256"
                },
                {
                    "name": "_divideBy",
                    "type": "uint256"
                },
                {
                    "name": "_startDate",
                    "type": "uint256"
                },
                {
                    "name": "_claimDate",
                    "type": "uint256"
                },
                {
                    "name": "_maximumClaimDate",
                    "type": "uint256"
                },
                {
                    "name": "_totalUnlocked",
                    "type": "uint256"
                }
            ],
            "name": "getStake",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ],
    "bytecode": "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061031f806100536000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638da5cb5b1461005c578063a829aa5e146100b3578063f2fde38b14610126575b600080fd5b34801561006857600080fd5b50610071610169565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100bf57600080fd5b5061011060048036038101908080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919050505061018e565b6040518082815260200191505060405180910390f35b34801561013257600080fd5b50610167600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061019e565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600190509695505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101f957600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561023557600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820fc42af94d93fd6aa9dede06eccde06db8923ab0d62b774c2d74a7a39e545e89d0029",
    "compiler": {
        "name": "solc",
        "version": "0.4.24+commit.e67f0147.Emscripten.clang"
    },
    "version": "0.1.0",
    "networks": {}
};
//# sourceMappingURL=Requirements.js.map