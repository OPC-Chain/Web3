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
exports.WalletController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const wallets_service_1 = require("./wallets.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_wallet_dto_1 = require("./dto/create-wallet.dto");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    create(req, newWalletDTO) {
        return this.walletService.create(req.user.userId, newWalletDTO.name);
    }
    async getAll(req) {
        return this.walletService.getAll(req.user.userId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/get-wallets.dto").NewWalletResponse }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_wallet_dto_1.NewWalletDTO]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/get-wallets.dto").WalletList }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getAll", null);
WalletController = __decorate([
    (0, common_1.Controller)('wallets'),
    __metadata("design:paramtypes", [wallets_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallets.controller.js.map