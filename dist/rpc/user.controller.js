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
exports.UserHandler = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nestjs_json_rpc_1 = require("@jashkasoft/nestjs-json-rpc");
const create_auth_dto_1 = require("../auth/dto/create-auth.dto");
const auth_service_1 = require("../auth/auth.service");
const wallets_service_1 = require("../wallets/wallets.service");
let UserHandler = class UserHandler {
    constructor(authService, walletService) {
        this.authService = authService;
        this.walletService = walletService;
    }
    async create(payload, id, req) {
        return this.authService.createWallet(payload);
    }
    async restore(payload, id, req) {
        if (!payload.password) {
            return {
                statusCode: 400,
                message: 'user.restore.require_password',
                UUID: '',
                token: '',
            };
        }
        const checkWallet = await this.walletService.checkMnemonic(payload.passPhase);
        if (!checkWallet.status) {
            return {
                statusCode: 400,
                message: checkWallet.message,
                UUID: '',
                token: '',
            };
        }
        return this.authService.createWallet(payload, payload.passPhase);
    }
    async verify(payload) {
        return this.authService.login(payload);
    }
};
__decorate([
    (0, nestjs_json_rpc_1.RpcMethodHandler)('new'),
    openapi.ApiResponse({ status: 200, type: require("../auth/dto/create-auth.dto").NewAccResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, nestjs_json_rpc_1.RpcId)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.NewWalletDTO, String, Object]),
    __metadata("design:returntype", Promise)
], UserHandler.prototype, "create", null);
__decorate([
    (0, nestjs_json_rpc_1.RpcMethodHandler)('restore'),
    openapi.ApiResponse({ status: 200, type: require("../auth/dto/create-auth.dto").NewAccResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, nestjs_json_rpc_1.RpcId)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.RestoreWalletDTO, String, Object]),
    __metadata("design:returntype", Promise)
], UserHandler.prototype, "restore", null);
__decorate([
    (0, nestjs_json_rpc_1.RpcMethodHandler)('verify'),
    openapi.ApiResponse({ status: 200, type: require("../auth/dto/create-auth.dto").NewAccResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserHandler.prototype, "verify", null);
UserHandler = __decorate([
    (0, nestjs_json_rpc_1.RpcHandler)({
        method: 'user',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        wallets_service_1.WalletService])
], UserHandler);
exports.UserHandler = UserHandler;
//# sourceMappingURL=user.controller.js.map