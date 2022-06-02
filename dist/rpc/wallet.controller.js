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
exports.WalletHandler = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nestjs_json_rpc_1 = require("@jashkasoft/nestjs-json-rpc");
const create_wallet_dto_1 = require("../wallets/dto/create-wallet.dto");
const get_wallets_dto_1 = require("../wallets/dto/get-wallets.dto");
const wallets_service_1 = require("../wallets/wallets.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let WalletHandler = class WalletHandler {
    constructor(walletService, authService) {
        this.walletService = walletService;
        this.authService = authService;
    }
    async add(payload, req) {
        return this.walletService.create(req.user.userId, payload.name);
    }
    async restore(payload, req) {
        const checkWallet = await this.walletService.checkMnemonic(payload.passPhase);
        if (!checkWallet.status) {
            return {
                statusCode: 400,
                message: checkWallet.message,
                address: '',
                privateKey: '',
                passPhase: '',
            };
        }
        return this.walletService.restore(req.user.userId, payload.name, payload.passPhase);
    }
    async restorePrivate(payload, req) {
        const checkWallet = await this.walletService.checkPrivate(payload.privateKey);
        if (!checkWallet.status) {
            return {
                statusCode: 400,
                message: checkWallet.message,
                address: '',
                privateKey: '',
                passPhase: '',
            };
        }
        return this.walletService.importPrivate(req.user.userId, payload.name, payload.privateKey);
    }
    async changeName(payload, req) {
        return this.walletService.changeName(req.user.userId, payload);
    }
    async removeWallet(payload, req) {
        return this.walletService.removeWallet(req.user.userId, payload);
    }
    async list(req) {
        return this.walletService.getAll(req.user.userId);
    }
    async reveal(payload, req) {
        const checkPass = await this.authService.checkPassword(req.user.userId, payload.password);
        if (checkPass !== true) {
            return checkPass;
        }
        return this.walletService.revealDataWallet(req.user.userId, payload.address, payload.type, payload.password);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('add'),
    openapi.ApiResponse({ status: 200, type: require("../wallets/dto/get-wallets.dto").NewWalletResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.NewWalletDTO, Object]),
    __metadata("design:returntype", Promise)
], WalletHandler.prototype, "add", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('restore'),
    openapi.ApiResponse({ status: 200, type: require("../wallets/dto/get-wallets.dto").NewWalletResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.ImportWalletDTO, Object]),
    __metadata("design:returntype", Promise)
], WalletHandler.prototype, "restore", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('restore-private'),
    openapi.ApiResponse({ status: 200, type: require("../wallets/dto/get-wallets.dto").NewWalletResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.RestoreWalletDTO, Object]),
    __metadata("design:returntype", Promise)
], WalletHandler.prototype, "restorePrivate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('edit'),
    openapi.ApiResponse({ status: 200, type: require("../wallets/dto/get-wallets.dto").EditWalletResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.ChangeNameWalletDTO, Object]),
    __metadata("design:returntype", Promise)
], WalletHandler.prototype, "changeName", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('remove'),
    openapi.ApiResponse({ status: 200, type: require("../wallets/dto/get-wallets.dto").EditWalletResponse }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.ChangeNameWalletDTO, Object]),
    __metadata("design:returntype", Promise)
], WalletHandler.prototype, "removeWallet", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('list'),
    openapi.ApiResponse({ status: 200, type: require("../wallets/dto/get-wallets.dto").WalletList }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletHandler.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('reveal'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_wallets_dto_1.QueryWalletData, Object]),
    __metadata("design:returntype", Promise)
], WalletHandler.prototype, "reveal", null);
WalletHandler = __decorate([
    (0, nestjs_json_rpc_1.RpcHandler)({
        method: 'wallet',
    }),
    __metadata("design:paramtypes", [wallets_service_1.WalletService,
        auth_service_1.AuthService])
], WalletHandler);
exports.WalletHandler = WalletHandler;
//# sourceMappingURL=wallet.controller.js.map