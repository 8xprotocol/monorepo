![8X Logo](https://8xprotocol.com/assets/images/full-logo.png)

---

8x Protocol enables decentralised recurring payments on the Ethereum blockchain.
A complete explanation of the protocol may be found in our [whitepaper](https://github.com/8xprotocol/whitepaper).

[![Telegram Chat](https://img.shields.io/badge/CHAT-TELEGRAM-0088cc.svg)](http://t.me/eightexprotocol_contributors)
[![Solidity](https://img.shields.io/badge/SOLIDITY-0.4.24-orange.svg)](https://solidity.readthedocs.io/en/develop/index.html)
[![Apache 2.0](https://img.shields.io/badge/LICENSE-APACHE2.0-3DA639.svg)](https://opensource.org/licenses/Apache-2.0)

## Contributing
We appreciate your desire to contribute to the 8x Protocol. We strive to maintain
a high standard over code quality and the security of our contracts. Please read over
this contributor guide before starting.

### How to Contribute
If you would like to contribute please fork the repo, create a new branch, fix the problem, commit the work with a clear message about what was accomplished, and submit a pull request.

### Code Quality
- When adding functionality, please also add tests and make sure they pass
- When adding a new function, make sure to add comments that adhere to the format seen throughout the project
- When fixing conflicts please use `rebase`
- When updating your working branch with `upstream master` changes, please `rebase`
- Make sure there are no linter `warnings` or `errors`

##### Requirements
- Truffle ^4.1.8
- Gananche UI
- NPM

##### Pre Requisites
```
npm install
npm install -g solhint
```

##### Running Contract Tests
```
truffle test
```

##### Running Style/Security Tests
```
npm run lint
```

##### Running Full Test Suite
```
npm run test
```
