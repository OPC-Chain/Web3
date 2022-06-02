"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const constants_1 = require("../common/constants");
const networks_schema_1 = require("./schemas/networks.schema");
const tokens_schema_1 = require("./schemas/tokens.schema");
const user_tokens_schema_1 = require("./schemas/user-tokens.schema");
const wallet_schema_1 = require("../wallets/schemas/wallet.schema");
const paginate_1 = require("../common/pagination/paginate");
const user_history_schema_1 = require("./schemas/user-history.schema");
const ethers_1 = require("ethers");
const Promise = __importStar(require("bluebird"));
const common_service_1 = require("../common/common.service");
let NetworksService = class NetworksService {
    constructor(networkModel, tokenModel, userTokenModel, usrHisModel, walletModel, commonService) {
        this.networkModel = networkModel;
        this.tokenModel = tokenModel;
        this.userTokenModel = userTokenModel;
        this.usrHisModel = usrHisModel;
        this.walletModel = walletModel;
        this.commonService = commonService;
        this.TOKEN_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "payable": false, "inputs": [] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "internalType": "address", "indexed": true }, { "type": "address", "name": "newOwner", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "_decimals", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "_name", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "_symbol", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "burn", "inputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "decreaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "subtractedValue", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "getOwner", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "increaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "addedValue", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "mint", "inputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "mintTo", "inputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "address", "name": "recipient", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "renounceOwnership", "inputs": [], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "sender", "internalType": "address" }, { "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "transferOwnership", "inputs": [{ "type": "address", "name": "newOwner", "internalType": "address" }], "constant": false }];
        this.tokenType = {
            opc_mainnet: 'OPC202',
            bsc_mainnet: 'BEP20',
            eth_mainnet: 'ERC20',
        };
    }
    async onModuleInit() {
    }
    async list() {
        try {
            const networkList = await this.networkModel
                .find()
                .select('-createdAt -_id');
            return {
                statusCode: 200,
                data: networkList,
            };
        }
        catch (error) {
            common_1.Logger.error('NetworksService - getList', error);
            return {
                statusCode: 500,
                message: 'network.list.fail',
                data: [],
            };
        }
    }
    async listToken() {
        try {
            const networkList = await this.tokenModel
                .find()
                .select('-createdAt -_id');
            return {
                statusCode: 200,
                data: networkList,
            };
        }
        catch (error) {
            common_1.Logger.error('NetworksService - getTokens', error);
            return {
                statusCode: 500,
                message: 'network.list.fail',
                data: [],
            };
        }
    }
    async addToken(tokenInput, userId) {
        const existsToken = await this.userTokenModel.findOne({
            userId,
            network: tokenInput.network,
            address: tokenInput.address,
        });
        if (existsToken) {
            return {
                statusCode: 400,
                message: 'add_token.fail.exists_wallet',
                data: [],
            };
        }
        const createdToken = new this.userTokenModel(Object.assign(Object.assign({}, tokenInput), { userId }));
        await createdToken.save();
        return {
            statusCode: 200,
            data: [createdToken],
        };
    }
    async getTokenInfo(requestToken) {
        try {
            if (!requestToken.network) {
                return {
                    statusCode: 400,
                    message: 'network.require_network_key',
                    data: [],
                };
            }
            const networkData = await this.networkModel.findOne({
                key: requestToken.network,
            });
            if (!networkData) {
                return {
                    statusCode: 404,
                    message: 'network.not_found',
                    data: [],
                };
            }
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(networkData.rpcUrl);
            const tokenContract = new ethers_1.ethers.Contract(requestToken.address, this.TOKEN_ABI, provider);
            const [decimals, tokenName, symbol] = await Promise.all([
                tokenContract.decimals(),
                tokenContract.name(),
                tokenContract.symbol(),
            ]);
            return {
                statusCode: 200,
                data: {
                    address: requestToken.address,
                    network: requestToken.network,
                    decimals,
                    name: tokenName,
                    symbol,
                    type: this.tokenType[requestToken.network],
                },
            };
        }
        catch (error) {
            common_1.Logger.error('NetworksService - getTokenInfo', error);
            return {
                statusCode: 500,
                message: 'network.get_token_info.fail',
                data: [],
            };
        }
    }
    async listUserToken(network, address, userId) {
        try {
            if (!network) {
                return {
                    statusCode: 400,
                    message: 'network.require_network_key',
                    data: [],
                };
            }
            const networkData = await this.networkModel.findOne({ key: network });
            if (!networkData) {
                return {
                    statusCode: 404,
                    message: 'network.not_found',
                    data: [],
                };
            }
            if (!address) {
                return {
                    statusCode: 400,
                    message: 'network.require_address',
                    data: [],
                };
            }
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(networkData.rpcUrl);
            const networkTokenList = await this.tokenModel
                .find({ network })
                .select('-createdAt -_id');
            const tokenList = await this.userTokenModel
                .find({ userId, network })
                .select('-createdAt -_id -userId');
            const getBalance = await provider.getBalance(address);
            const amountList = await Promise.all([...networkTokenList, ...tokenList].map(async (item) => {
                return Object.assign(Object.assign({}, item.toJSON()), { price: item.price
                        ? await this.getPriceTokenOPC(item.address, provider)
                        : 0, balance: await new ethers_1.ethers.Contract(item.address, this.TOKEN_ABI, provider).balanceOf(address) });
            }));
            return {
                statusCode: 200,
                data: [
                    {
                        name: networkData.symbol,
                        symbol: networkData.symbol,
                        balance: ethers_1.ethers.utils.formatEther(getBalance),
                        price: '0.0279115',
                        imgUrl: `https://static.openchain.info/hostweb/chain_token/${networkData.symbol.toLowerCase()}.png`,
                    },
                ].concat(amountList.map((item) => (Object.assign(Object.assign({}, item), { balance: ethers_1.ethers.utils.formatUnits(item.balance, item.decimals), price: item.price || '0', imgUrl: `https://static.openchain.info/hostweb/chain_token/${item.symbol.toLowerCase()}.png` })))),
            };
        }
        catch (error) {
            common_1.Logger.error('NetworksService - listUserToken', error);
            return {
                statusCode: 500,
                message: 'network.list_user_token.fail',
                data: [],
            };
        }
    }
    async calculateTransaction(network, from, to, userId, amount, token) {
        let gasLimit = 21000;
        try {
            const getGas = await this.commonService.getMinFee();
            const networkData = await this.networkModel.findOne({ key: network });
            if (!networkData) {
                return {
                    statusCode: 404,
                    message: 'network.not_found',
                    gasLimit,
                    gasPrice: 1,
                };
            }
            const findWallet = await this.walletModel.findOne({
                userId,
                address: ethers_1.ethers.utils.getAddress(from),
            });
            if (!findWallet) {
                return {
                    statusCode: 404,
                    message: 'wallet.data.not_found_wallet',
                    gasLimit,
                    gasPrice: 1,
                };
            }
            if (!to) {
                return {
                    statusCode: 400,
                    message: 'wallet.send.require_to_address',
                    gasLimit,
                    gasPrice: 1,
                };
            }
            if (!ethers_1.ethers.utils.isAddress(to)) {
                return {
                    statusCode: 400,
                    message: 'wallet.send.to_address_wrong_format',
                    gasLimit,
                    gasPrice: 1,
                };
            }
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(networkData.rpcUrl);
            const walletWithKey = new ethers_1.ethers.Wallet(findWallet.privateKey, provider);
            if (token) {
                let tokenFind = await this.userTokenModel.findOne({
                    network,
                    address: token,
                });
                if (!tokenFind) {
                    tokenFind = await this.tokenModel.findOne({
                        network,
                        address: token,
                    });
                }
                if (!tokenFind) {
                    return {
                        statusCode: 404,
                        message: 'token.not_found',
                        gasLimit,
                        gasPrice: 1,
                    };
                }
                const contract = new ethers_1.ethers.Contract(token, this.TOKEN_ABI, walletWithKey);
                const estimateGas = await contract.estimateGas.transfer(to, ethers_1.ethers.utils.parseUnits(amount, tokenFind.decimals));
                gasLimit = estimateGas.toNumber();
            }
            else {
                const txSend = {
                    from,
                    to,
                    value: ethers_1.ethers.utils.parseEther(amount),
                };
                const estimateGas = await provider.estimateGas(txSend);
                gasLimit =
                    estimateGas.toNumber() < gasLimit ? gasLimit : estimateGas.toNumber();
            }
            return {
                statusCode: 200,
                gasLimit,
                gasPrice: (Number(getGas) * 10 ** 9) / gasLimit,
            };
        }
        catch (error) {
            common_1.Logger.error('NetworksService - calculateTransaction', error);
            return {
                statusCode: 500,
                message: 'network.calculate_transaction.fail',
                gasLimit,
                gasPrice: 1,
            };
        }
    }
    async sendToken(network, from, to, userId, amount, token, gasPrice, gasLimit) {
        try {
            const getGas = await this.commonService.getMinFee();
            if (Number(gasPrice) * Number(gasLimit) < Number(getGas) * 10 ** 9) {
                return {
                    statusCode: 404,
                    message: 'network.under_price',
                    txHash: '',
                };
            }
            const networkData = await this.networkModel.findOne({ key: network });
            if (!networkData) {
                return {
                    statusCode: 404,
                    message: 'network.not_found',
                    txHash: '',
                };
            }
            const findWallet = await this.walletModel.findOne({
                userId,
                address: ethers_1.ethers.utils.getAddress(from),
            });
            if (!findWallet) {
                return {
                    statusCode: 404,
                    message: 'wallet.data.not_found_wallet',
                    txHash: '',
                };
            }
            if (!to) {
                return {
                    statusCode: 400,
                    message: 'wallet.send.require_to_address',
                    txHash: '',
                };
            }
            if (!ethers_1.ethers.utils.isAddress(to)) {
                return {
                    statusCode: 400,
                    message: 'wallet.send.to_address_wrong_format',
                    txHash: '',
                };
            }
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(networkData.rpcUrl);
            const getBalance = await provider.getBalance(from);
            const walletWithKey = new ethers_1.ethers.Wallet(findWallet.privateKey, provider);
            if (token) {
                let tokenFind = await this.userTokenModel.findOne({
                    network,
                    address: token,
                });
                if (!tokenFind) {
                    tokenFind = await this.tokenModel.findOne({
                        network,
                        address: token,
                    });
                }
                if (!tokenFind) {
                    return {
                        statusCode: 404,
                        message: 'token.not_found',
                        txHash: '',
                    };
                }
                const contract = new ethers_1.ethers.Contract(token, this.TOKEN_ABI, walletWithKey);
                const balanceToken = await contract.balanceOf(from);
                console.log('balanceToken', balanceToken);
                if (balanceToken.gt(ethers_1.ethers.utils.parseUnits(amount, tokenFind.decimals))) {
                    const [estimateGasToken, gasPrice] = await Promise.all([
                        contract.estimateGas.transfer(to, ethers_1.ethers.utils.parseUnits(amount, tokenFind.decimals)),
                        provider.getGasPrice(),
                    ]);
                    if (getBalance.gt(estimateGasToken.mul(gasPrice))) {
                        const txDat = await contract.transfer(to, ethers_1.ethers.utils.parseUnits(amount, tokenFind.decimals), {
                            gasPrice,
                            gasLimit,
                        });
                        await this.usrHisModel.create({
                            userId,
                            network,
                            action: 'send_token',
                            from_address: from,
                            to_address: to,
                            token,
                            symbol: tokenFind.symbol,
                            amount,
                            data: '',
                            txHash: txDat.hash,
                            network_fee: ethers_1.ethers.utils.formatEther(txDat.gasLimit.mul(txDat.gasPrice)),
                        });
                        return {
                            statusCode: 200,
                            txHash: txDat.hash,
                            network_fee: ethers_1.ethers.utils.formatEther(txDat.gasLimit.mul(txDat.gasPrice)),
                        };
                    }
                    else {
                        return {
                            statusCode: 400,
                            message: 'wallet.send.not_enough_balance_fee',
                            result: '',
                        };
                    }
                }
                else {
                    return {
                        statusCode: 400,
                        message: 'wallet.send.token_not_enough_balance',
                        result: '',
                    };
                }
            }
            else {
                const txSend = {
                    from,
                    to,
                    value: ethers_1.ethers.utils.parseEther(amount),
                    gasPrice,
                    gasLimit,
                };
                if (getBalance.gt(txSend.value)) {
                    const [estimateSend, gasPrice] = await Promise.all([
                        provider.estimateGas(txSend),
                        provider.getGasPrice(),
                    ]);
                    if (getBalance.gt(txSend.value.add(estimateSend.mul(gasPrice)))) {
                        const tran = await walletWithKey.sendTransaction(txSend);
                        await this.usrHisModel.create({
                            userId,
                            network,
                            action: 'send',
                            from_address: from,
                            to_address: to,
                            token,
                            symbol: networkData.symbol,
                            amount,
                            data: '',
                            txHash: tran.hash,
                            network_fee: ethers_1.ethers.utils.formatEther(tran.gasLimit.mul(tran.gasPrice)),
                        });
                        return {
                            statusCode: 200,
                            txHash: tran.hash,
                            network_fee: ethers_1.ethers.utils.formatEther(tran.gasLimit.mul(tran.gasPrice)),
                        };
                    }
                    else {
                        return {
                            statusCode: 400,
                            message: 'wallet.send.coin_not_enough_balance_with_fee',
                            result: '',
                        };
                    }
                }
                else {
                    return {
                        statusCode: 400,
                        message: 'wallet.send.coin_not_enough_balance',
                        result: '',
                    };
                }
            }
        }
        catch (error) {
            common_1.Logger.error('NetworksService - sendToken', error);
            return {
                statusCode: 500,
                message: 'network.send_token.fail',
                data: [],
            };
        }
    }
    async getHistory(network, from_address, userId, page, limit) {
        if (!Number(page))
            page = 1;
        const query = { network, from_address, userId };
        const results = await this.usrHisModel
            .find(query)
            .sort('-createdAt')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        const totalDoc = await this.usrHisModel.countDocuments(query);
        return Object.assign({ statusCode: 200, data: results.map((item) => (Object.assign(Object.assign({}, item.toJSON()), { imgUrl: `https://static.openchain.info/hostweb/chain_token/${item.symbol.toLowerCase()}.png` }))) }, (0, paginate_1.paginate)(totalDoc, Number(page), Number(limit), results.length));
    }
    async getPriceTokenOPC(address, provider) {
        const networkData = await this.networkModel.findOne({ key: 'opc_mainnet' });
        const USDT_ADDRESS = '0xa1bf5cdb183b69a69B39aB1fA14D6B3A13445aB9';
        if (address.toLowerCase() === USDT_ADDRESS.toLowerCase()) {
            return 1;
        }
        if (networkData) {
            try {
                const swapContract = new ethers_1.ethers.Contract('0x71b8887F93fCC3F40B85F9F5Ab50d8CeEAa31964', constants_1.ROUTER_ABI, provider);
                const swapAmount = await swapContract.getAmountsOut(String(10 ** 18), [
                    address,
                    USDT_ADDRESS,
                ]);
                return ethers_1.ethers.utils.formatEther(swapAmount[1]);
            }
            catch (error) {
                console.log('getAmountsOut error', error);
                return 0;
            }
        }
        else {
            return 0;
        }
    }
    async initData() {
        await this.networkModel.findOneAndUpdate({ key: 'opc_mainnet' }, {
            name: 'OPENCHAIN mainnet',
            rpcUrl: 'http://mainnet.openchain.info:8545',
            chainId: '0x309',
            symbol: 'OPC',
            explorer: 'https://openchain.info',
        }, { upsert: true });
        const tokens_opc = [
            {
                address: '0xa1bf5cdb183b69a69B39aB1fA14D6B3A13445aB9',
                name: 'Tether USD',
                symbol: 'USDT',
                price: '1',
                decimals: 18,
            },
            {
                address: '0x08d149cbdf3d3C216278Ad0e500A5f0B991F1fb5',
                name: 'BUSD Token',
                symbol: 'BUSD',
                price: '1',
                decimals: 18,
            },
            {
                address: '0x1CeE095bd080590bF470f6a6dA939f2c06e2911A',
                name: 'Donate To Earn',
                symbol: 'D2E',
                price: '0.00267',
                decimals: 18,
            },
            {
                address: '0xAC5bDd14e51EB7FbC7EE170d9651e7FcFaD89De3',
                name: 'Ethereum Token',
                symbol: 'ETH',
                price: '2953.8',
                decimals: 18,
            },
            {
                address: '0x65A64825c592Da440E5687d9d39CF266218542F4',
                name: 'PoolSwap Token',
                symbol: 'PS',
                price: '0.00338071',
                decimals: 18,
            },
        ];
        await Promise.each(tokens_opc, async (token) => {
            await this.tokenModel.findOneAndUpdate({
                network: 'opc_mainnet',
                address: token.address.toLowerCase(),
            }, Object.assign(Object.assign({}, token), { address: token.address.toLowerCase(), type: 'OPC202' }), { upsert: true });
        });
        await this.networkModel.findOneAndUpdate({ key: 'bsc_mainnet' }, {
            name: 'Binance Smart Chain mainnet',
            rpcUrl: 'https://bsc-dataseed.binance.org',
            chainId: '0x38',
            symbol: 'BNB',
            explorer: 'https://bscscan.com',
        }, { upsert: true });
        const tokens_bsc = [
            {
                address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                name: 'Ethereum Token',
                symbol: 'ETH',
                price: '2953.8',
                decimals: 18,
            },
            {
                address: '0x55d398326f99059ff775485246999027b3197955',
                name: 'Tether USD',
                symbol: 'USDT',
                price: '1',
                decimals: 18,
            },
            {
                address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                name: 'Wrapped BNB',
                symbol: 'WBNB',
                price: '403.14',
                decimals: 18,
            },
            {
                address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
                name: 'BUSD Token',
                symbol: 'BUSD',
                price: '1',
                decimals: 18,
            },
            {
                address: '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
                name: 'SHIBA INU',
                symbol: 'SHIB',
                price: '0.00002915',
                decimals: 18,
            },
        ];
        await Promise.each(tokens_bsc, async (token) => {
            await this.tokenModel.findOneAndUpdate({
                network: 'bsc_mainnet',
                address: token.address.toLowerCase(),
            }, Object.assign(Object.assign({}, token), { address: token.address.toLowerCase(), type: 'BEP20' }), { upsert: true });
        });
        await this.networkModel.findOneAndUpdate({ key: 'eth_mainnet' }, {
            name: 'Ethereum Mainnet',
            rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            chainId: '0x1',
            symbol: 'ETH',
            explorer: 'https://etherscan.io',
        }, { upsert: true });
        const tokens_eth = [
            {
                address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                name: 'Tether USD',
                symbol: 'USDT',
                price: '1',
                decimals: 6,
            },
            {
                address: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
                name: 'BNB',
                symbol: 'BNB',
                price: '403.14',
                decimals: 18,
            },
            {
                address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                name: 'Wrapped Ether',
                symbol: 'WETH',
                price: '2953.8',
                decimals: 18,
            },
            {
                address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                name: 'USD Coin',
                symbol: 'USDC',
                price: '1',
                decimals: 6,
            },
            {
                address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
                name: 'SHIBA INU',
                symbol: 'SHIB',
                price: '0.00002915',
                decimals: 18,
            },
        ];
        await Promise.each(tokens_eth, async (token) => {
            await this.tokenModel.findOneAndUpdate({
                network: 'eth_mainnet',
                address: token.address.toLowerCase(),
            }, Object.assign(Object.assign({}, token), { address: token.address.toLowerCase(), type: 'ERC20' }), { upsert: true });
        });
    }
};
NetworksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(networks_schema_1.Network.name)),
    __param(1, (0, mongoose_2.InjectModel)(tokens_schema_1.Token.name)),
    __param(2, (0, mongoose_2.InjectModel)(user_tokens_schema_1.UserToken.name)),
    __param(3, (0, mongoose_2.InjectModel)(user_history_schema_1.UserHistory.name)),
    __param(4, (0, mongoose_2.InjectModel)(wallet_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        common_service_1.CommonService])
], NetworksService);
exports.NetworksService = NetworksService;
//# sourceMappingURL=networks.service.js.map