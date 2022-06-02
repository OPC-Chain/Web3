
## Description

[Web3](https://github.com/OPC-Chain/Web3) web3 is a collection of libraries which allow you to interact with a local or remote openchain node, using a HTTP or IPC connection. The web3 JavaScript library interacts with the Openchain blockchain. It can retrieve user accounts, send transactions, interact with smart contracts, and more.

## Installation and Setting up environment

- Install [Node.js](https://nodejs.org) version 14
    - If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.
- Install dependencies: `npm install` (not the usual install command)
- Make file `.env` and copy the `.env.dist` file to `.env`
    - Replace the `SECRET_JWT` value with your own personal [JWT](https://jwt.io/introduction).
    - Create your own Database in MongoDB and fill the information `mongo_host` `mongo_port` `mongo_authen` and `mongo_db=` [Create Database MongoDB](https://www.mongodb.com/basics/create-database)
- Running: 

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

### SSH
ssh -p 2213 ubuntu@14.225.239.246
https://cryptologos.cc/
### TODO
- Api restore wallet: Missing import private key x
- Api get balance missing price and coin image Url x
- Merge api get token and get balance x
- Api export PassPharse or Private Key missing recheck password x
- Api get token info from token address => auto fill name, symbol, decimal x
- Add field NumberWallet for api login to check user create wallet or not x

- process get current price
- tracking request info

## ROADMAP

Updated 2nd June 2022

Q1 2022: 
   + Core: Internal scaffolding

Q2 2022:
   + Storage: Decentralized storage 
   + Wallet: Send, receive, transaction history
   + Browser extension

Q3 2022: 
   + API & Console: API keys for other software to interact with
   + Mimiking extension API: Will allow to support all dApps on all Openchain and Ethereum-compatible
   + Notifications: Receive notifications right from dApps
   + Confirmation window: To confirm transactions and action

Q4 2022:
   + Point Explorer: See blocks and transactions for multiple chains right from Point Browser, without trusting explorer websites
   + Point token: Tokenomics, staking/validator, bridge
   + Governance: Libraries to control signatures over proposals