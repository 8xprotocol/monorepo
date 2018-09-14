"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeContract = {
    "contractName": "StakeContract",
    "abi": [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_target",
                    "type": "address"
                }
            ],
            "name": "addAuthorizedAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "authorities",
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
            "constant": true,
            "inputs": [],
            "name": "tokenContract",
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
                    "name": "_target",
                    "type": "address"
                }
            ],
            "name": "removeAuthorizedAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "userStakes",
            "outputs": [
                {
                    "name": "lockedUp",
                    "type": "uint256"
                },
                {
                    "name": "total",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
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
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "authorized",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAuthorizedAddresses",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
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
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Locked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Unlocked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Slashed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "destination",
                    "type": "address"
                }
            ],
            "name": "Transferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "ToppedUp",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Withdrew",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "gini",
                    "type": "uint256"
                }
            ],
            "name": "GiniCoefficientUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "divideBy",
                    "type": "uint256"
                }
            ],
            "name": "DivideTotalUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "target",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "caller",
                    "type": "address"
                }
            ],
            "name": "LogAuthorizedAddressAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "target",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "caller",
                    "type": "address"
                }
            ],
            "name": "LogAuthorizedAddressRemoved",
            "type": "event"
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
            "constant": false,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "name": "_gini",
                    "type": "uint256"
                }
            ],
            "name": "setGiniCoefficient",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "name": "_divideBy",
                    "type": "uint256"
                }
            ],
            "name": "setDivideTotalBy",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_staker",
                    "type": "address"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "lockTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_staker",
                    "type": "address"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "unlockTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_staker",
                    "type": "address"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "slashTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_staker",
                    "type": "address"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_destination",
                    "type": "address"
                }
            ],
            "name": "transferStake",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_staker",
                    "type": "address"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getTotalStake",
            "outputs": [
                {
                    "name": "total",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_staker",
                    "type": "address"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getAvailableStake",
            "outputs": [
                {
                    "name": "available",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_staker",
                    "type": "address"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getLockedStake",
            "outputs": [
                {
                    "name": "locked",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getTotalTokenStake",
            "outputs": [
                {
                    "name": "total",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getAvailableTokenStake",
            "outputs": [
                {
                    "name": "available",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getLockedTokenStake",
            "outputs": [
                {
                    "name": "locked",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getTokenStakeDetails",
            "outputs": [
                {
                    "name": "total",
                    "type": "uint256"
                },
                {
                    "name": "lockedUp",
                    "type": "uint256"
                },
                {
                    "name": "gini",
                    "type": "uint256"
                },
                {
                    "name": "divideBy",
                    "type": "uint256"
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
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "topUpStake",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "withdrawStake",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b506040516020806127c583398101806040528101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050612701806100c46000396000f30060806040526004361061013e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806307e37e6f1461014357806312fd7812146101d05780632d4526581461023557806331508b4d146102a257806333de237f146102ef5780634045148d1461036657806342f1181e146103bd5780634767ceee14610400578063494503d41461046d57806349a2b2bd146104da5780635530bf8b1461055157806355a373d6146105a8578063676a6300146105ff578063707129391461064c578063862d2d7c1461068f5780638da5cb5b1461070d57806390e75d7614610764578063b9181611146107d1578063bd4e07151461082c578063d39de6e914610879578063d7e6df9f146108e5578063dd2368c914610951578063f14bb5da146109c8578063f2fde38b14610a1f575b600080fd5b34801561014f57600080fd5b506101ce600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a62565b005b3480156101dc57600080fd5b5061021b60048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e14565b604051808215151515815260200191505060405180910390f35b34801561024157600080fd5b506102a0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611040565b005b3480156102ae57600080fd5b506102ed600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611263565b005b3480156102fb57600080fd5b50610350600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061134d565b6040518082815260200191505060405180910390f35b34801561037257600080fd5b506103a7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611458565b6040518082815260200191505060405180910390f35b3480156103c957600080fd5b506103fe600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114e8565b005b34801561040c57600080fd5b5061046b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506116b8565b005b34801561047957600080fd5b5061049860048036038101908080359060200190929190505050611865565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104e657600080fd5b5061053b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506118a3565b6040518082815260200191505060405180910390f35b34801561055d57600080fd5b50610592600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061192d565b6040518082815260200191505060405180910390f35b3480156105b457600080fd5b506105bd611979565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561060b57600080fd5b5061064a60048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061199f565b005b34801561065857600080fd5b5061068d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611bf4565b005b34801561069b57600080fd5b506106f0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611e9b565b604051808381526020018281526020019250505060405180910390f35b34801561071957600080fd5b50610722611ecc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561077057600080fd5b506107cf600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611ef1565b005b3480156107dd57600080fd5b50610812600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506121f1565b604051808215151515815260200191505060405180910390f35b34801561083857600080fd5b50610877600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050612211565b005b34801561088557600080fd5b5061088e6122fb565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156108d15780820151818401526020810190506108b6565b505050509050019250505060405180910390f35b3480156108f157600080fd5b50610926600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612389565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b34801561095d57600080fd5b506109b2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612430565b6040518082815260200191505060405180910390f35b3480156109d457600080fd5b50610a09600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506124ba565b6040518082815260200191505060405180910390f35b348015610a2b57600080fd5b50610a60600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612506565b005b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515610aba57600080fd5b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015410151515610b4857600080fd5b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254039250508190555081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254039250508190555081600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254019250508190555081600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282540192505081905550818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f0fb52b545faa9c90e004f29604a41ad8cdbb14e921764129b963b88a85416f4f84604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a450505050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015610f0f57600080fd5b505af1158015610f23573d6000803e3d6000fd5b505050506040513d6020811015610f3957600080fd5b8101908080519060200190929190505050156110355782600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254019250508190555082600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082825401925050819055506001905061103a565b600090505b92915050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561109857600080fd5b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541015151561112657600080fd5b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254039250508190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282540392505081905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fe6e0ef9cd056ca98561ca60e347ada61e1ede2f1142a078951b7a52e1e508e6060405160405180910390a4505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156112be57600080fd5b80600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020181905550808273ffffffffffffffffffffffffffffffffffffffff167fd211de5e0d676c5ca25e603db286046c0b1c2dd2e2dcd20c5b470023e701677c60405160405180910390a35050565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015403905092915050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154039050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561154357600080fd5b80600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561159d57600080fd5b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060028290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f94bb87f4c15c4587ff559a7584006fa01ddf9299359be6b512b94527aa961aca60405160405180910390a35050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561171057600080fd5b8061171b848461134d565b1015151561172857600080fd5b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254019250508190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282540192505081905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f989eaa915cbb416ea3d6f9a63b1a3de51770c7674b11fe21ecdf76b4e1d1391060405160405180910390a4505050565b60028181548110151561187457fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154905092915050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b816119aa338361134d565b101515156119b757600080fd5b81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254039250508190555081600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008282540392505081905550600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015611b5957600080fd5b505af1158015611b6d573d6000803e3d6000fd5b505050506040513d6020811015611b8357600080fd5b810190808051906020019092919050505050818173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f0472be967f9a37138dfea1875af44784cafb79f92044ab33d7d6958eddd9ca6c60405160405180910390a45050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611c5157600080fd5b81600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515611caa57600080fd5b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055600091505b600280549050821015611e3c578273ffffffffffffffffffffffffffffffffffffffff16600283815481101515611d3157fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611e2f576002600160028054905003815481101515611d8f57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600283815481101515611dc957fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600281818054905003915081611e29919061265b565b50611e3c565b8180600101925050611cfe565b3373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167ff5b347a1e40749dd050f5f07fbdbeb7e3efa9756903044dd29401fd1d4bb4a1c60405160405180910390a3505050565b6003602052816000526040600020602052806000526040600020600091509150508060000154908060010154905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515611f4957600080fd5b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015410151515611fd757600080fd5b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254039250508190555080600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254039250508190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254039250508190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282540392505081905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f96e0041f14ae401fab2384e3c29da20cb0263ef760c47847db1f13403cea654c60405160405180910390a4505050565b60016020528060005260406000206000915054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561226c57600080fd5b80600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030181905550808273ffffffffffffffffffffffffffffffffffffffff167f7c8edc37b7f25e9513343af51d0e8d77fd0947d04428cfde2cbbde345a20d71760405160405180910390a35050565b6060600280548060200260200160405190810160405280929190818152602001828054801561237f57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311612335575b5050505050905090565b600080600080612397612687565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060806040519081016040529081600082015481526020016001820154815260200160028201548152602001600382015481525050905080602001518160000151826040015183606001519450945094509450509193509193565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154905092915050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561256157600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561259d57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b8154818355818111156126825781836000526020600020918201910161268191906126b0565b5b505050565b608060405190810160405280600081526020016000815260200160008152602001600081525090565b6126d291905b808211156126ce5760008160009055506001016126b6565b5090565b905600a165627a7a72305820e4d68592d79f33448b8c9ec76aaf0d5ec0aa6ff7fcd57290daadf2ddc83916df0029",
    "compiler": {
        "name": "solc",
        "version": "0.4.24+commit.e67f0147.Emscripten.clang"
    },
    "version": "0.1.0",
    "networks": {}
};
//# sourceMappingURL=StakeContract.js.map