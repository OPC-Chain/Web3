"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_schema_1 = require("../users/schemas/user.schema");
const uuid_1 = require("uuid");
const wallets_service_1 = require("../wallets/wallets.service");
let AuthService = class AuthService {
    constructor(userModel, jwtService, walletService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.walletService = walletService;
    }
    async createWallet(newWallet, restore) {
        if (!newWallet.password) {
            return {
                statusCode: 400,
                message: 'user.new.require_password',
                UUID: '',
                token: '',
            };
        }
        const newUUID = (0, uuid_1.v4)();
        const hashedPassword = await (0, bcrypt_1.hash)(newWallet.password, 12);
        const createdUser = await this.userModel.create({
            UUID: newUUID,
            password: hashedPassword,
        });
        const payload = {
            sub: createdUser._id.toString(),
            role: 'staff',
        };
        if (restore) {
            await this.walletService.restore(createdUser._id.toString(), '', restore);
        }
        return {
            statusCode: 200,
            UUID: newUUID,
            token: this.jwtService.sign(payload),
        };
    }
    async login(loginInput) {
        console.log(loginInput);
        const findUser = await this.userModel.findOne({
            UUID: loginInput.UUID,
        });
        console.log(findUser);
        if (!findUser) {
            return {
                statusCode: 404,
                message: 'user.new.not_found_user',
                UUID: '',
                token: '',
            };
        }
        const isMatch = await (0, bcrypt_1.compare)(loginInput.password, findUser.password);
        if (!isMatch) {
            return {
                statusCode: 400,
                message: 'user.new.wrong_credential',
                UUID: '',
                token: '',
            };
        }
        const payload = {
            sub: findUser._id.toString(),
            role: 'staff',
        };
        return {
            statusCode: 200,
            UUID: loginInput.UUID,
            token: this.jwtService.sign(payload),
            numberWallets: await this.walletService.getAmountWallet(findUser._id.toString()),
        };
    }
    async checkPassword(userId, password) {
        const findUser = await this.userModel.findById(userId);
        if (!findUser) {
            return {
                statusCode: 404,
                message: 'user.not_found_user',
            };
        }
        const isMatch = await (0, bcrypt_1.compare)(password, findUser.password);
        if (!isMatch) {
            return {
                statusCode: 400,
                message: 'user.wrong_credential',
            };
        }
        return true;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService,
        wallets_service_1.WalletService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map