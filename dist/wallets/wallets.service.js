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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const bip39 = __importStar(require("bip39"));
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const wallet_schema_1 = require("./schemas/wallet.schema");
const paginate_1 = require("../common/pagination/paginate");
const success_response_dto_1 = require("../common/dto/success-response.dto");
let WalletService = class WalletService {
    constructor(walletModel) {
        this.walletModel = walletModel;
    }
    async create(userId, name) {
        try {
            const mnemonic = bip39.generateMnemonic();
            const walletIns = ethers_1.utils.HDNode.fromMnemonic(mnemonic);
            const createdWallet = await this.walletModel.create({
                address: walletIns.address,
                name: name || 'Wallet 1',
                privateKey: walletIns.privateKey,
                publicKey: walletIns.publicKey,
                passPhase: mnemonic,
                userId,
                createdAt: Date.now(),
            });
            return {
                statusCode: 200,
                name: name || 'Wallet 1',
                address: createdWallet.address,
                privateKey: createdWallet.privateKey,
                passPhase: createdWallet.passPhase,
            };
        }
        catch (error) {
            common_1.Logger.error('WalletService - create', error);
            return {
                statusCode: 500,
                message: 'wallet.add.fail',
                address: '',
                privateKey: '',
                passPhase: '',
            };
        }
    }
    async restore(userId, name, phrase) {
        try {
            const walletIns = ethers_1.utils.HDNode.fromMnemonic(phrase);
            const createdWallet = await this.walletModel.create({
                address: walletIns.address,
                name: name || 'Wallet 1',
                privateKey: walletIns.privateKey,
                publicKey: walletIns.publicKey,
                passPhase: phrase,
                userId,
                createdAt: Date.now(),
            });
            return {
                statusCode: 200,
                address: createdWallet.address,
                privateKey: createdWallet.privateKey,
                passPhase: createdWallet.passPhase,
            };
        }
        catch (error) {
            common_1.Logger.error('WalletService - create', error);
            return {
                statusCode: 500,
                message: 'wallet.add.fail',
                address: '',
                privateKey: '',
                passPhase: '',
            };
        }
    }
    async importPrivate(userId, name, privateKey) {
        try {
            const walletIns = new ethers_1.ethers.Wallet(privateKey);
            const createdWallet = await this.walletModel.create({
                address: walletIns.address,
                name: name || 'Wallet 1',
                privateKey,
                publicKey: walletIns.publicKey,
                passPhase: '',
                userId,
                createdAt: Date.now(),
            });
            return {
                statusCode: 200,
                address: createdWallet.address,
                privateKey: createdWallet.privateKey,
                passPhase: '',
            };
        }
        catch (error) {
            common_1.Logger.error('WalletService - create', error);
            return {
                statusCode: 500,
                message: 'wallet.add.fail',
                address: '',
                privateKey: '',
                passPhase: '',
            };
        }
    }
    async changeName(userId, inputEdit) {
        try {
            const findWallet = await this.walletModel.findOne({
                userId,
                address: ethers_1.ethers.utils.getAddress(inputEdit.address),
            });
            if (!findWallet) {
                return Object.assign({ statusCode: 404, message: 'wallet.edit.not_found_wallet' }, inputEdit);
            }
            findWallet.name = inputEdit.name;
            await findWallet.save();
            return Object.assign(Object.assign({}, inputEdit), { statusCode: 200 });
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'wallet.edit.fail',
                address: '',
                name: '',
            };
        }
    }
    async removeWallet(userId, inputEdit) {
        try {
            const findWallet = await this.walletModel.findOne({
                userId,
                address: ethers_1.ethers.utils.getAddress(inputEdit.address),
            });
            if (!findWallet) {
                return Object.assign({ statusCode: 404, message: 'wallet.remove.not_found_wallet' }, inputEdit);
            }
            findWallet.userId = '';
            await findWallet.save();
            return Object.assign({ statusCode: 200, message: '' }, inputEdit);
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'wallet.remove.fail',
                address: '',
                name: '',
            };
        }
    }
    async getAmountWallet(userId) {
        try {
            return this.walletModel.countDocuments({ userId });
        }
        catch (error) {
            return 0;
        }
    }
    async getAll(userId) {
        try {
            const walletList = await this.walletModel
                .find({ userId })
                .select('address name');
            return {
                statusCode: 200,
                data: walletList,
            };
        }
        catch (error) {
            common_1.Logger.error('WalletService - getAll', error);
            return {
                statusCode: 500,
                message: 'wallet.list.fail',
                data: [],
            };
        }
    }
    async getUser(userId) {
        try {
            const wallet = await this.walletModel.findOne({ userId });
            wallet.passPhase = undefined;
            wallet.publicKey = undefined;
            wallet.privateKey = undefined;
            return wallet;
        }
        catch (error) {
            common_1.Logger.error('WalletService - getUser', error);
            return undefined;
        }
    }
    async revealDataWallet(userId, address, type, password) {
        try {
            const foundWallet = await this.walletModel.findOne({
                userId,
                address: ethers_1.ethers.utils.getAddress(address),
            });
            if (foundWallet) {
                return {
                    statusCode: 200,
                    result: foundWallet[type],
                };
            }
            return {
                statusCode: 404,
                message: 'wallet.data.not_found_wallet',
                result: '',
            };
        }
        catch (error) {
            common_1.Logger.error('WalletService - revealDataWallet', error);
            return {
                statusCode: 500,
                message: 'wallet.data.fail',
                result: '',
            };
        }
    }
    checkMnemonic(phrase) {
        try {
            const walletWithPhrase = ethers_1.ethers.Wallet.fromMnemonic(phrase);
            return {
                status: true,
            };
        }
        catch (error) {
            return {
                status: false,
                message: 'wallet.restore.invalid_mnemonic',
            };
        }
    }
    checkPrivate(privateKey) {
        try {
            const walletWithPrivate = new ethers_1.ethers.Wallet(privateKey);
            return {
                status: true,
            };
        }
        catch (error) {
            return {
                status: false,
                message: 'wallet.restore.invalid_privateKey',
            };
        }
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(wallet_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallets.service.js.map