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
exports.NetworkHandler = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nestjs_json_rpc_1 = require("@jashkasoft/nestjs-json-rpc");
const networks_service_1 = require("../networks/networks.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_token_dto_1 = require("../networks/dto/user-token.dto");
let NetworkHandler = class NetworkHandler {
    constructor(networkService) {
        this.networkService = networkService;
    }
    async list() {
        return this.networkService.list();
    }
    async listTokens() {
        return this.networkService.listToken();
    }
    async addToken(payload, req) {
        return this.networkService.addToken(payload, req.user.userId);
    }
    async getTokenInfo(payload, req) {
        return this.networkService.getTokenInfo(payload);
    }
    async getUserToken(payload, req) {
        return this.networkService.listUserToken(payload.network, payload.address, req.user.userId);
    }
    async sendToken(payload, req) {
        return this.networkService.sendToken(payload.network, payload.from_address, payload.to_address, req.user.userId, payload.amount, payload.token, payload.gasPrice, payload.gasLimit);
    }
    async calculateTransaction(payload, req) {
        return this.networkService.calculateTransaction(payload.network, payload.from_address, payload.to_address, req.user.userId, payload.amount, payload.token);
    }
    async getHistory(payload, req) {
        return this.networkService.getHistory(payload.network, payload.address, req.user.userId, payload.page, payload.limit);
    }
};
__decorate([
    (0, nestjs_json_rpc_1.RpcMethodHandler)('list'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "list", null);
__decorate([
    (0, nestjs_json_rpc_1.RpcMethodHandler)('tokens'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "listTokens", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('add-token'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.AddTokenDto, Object]),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "addToken", null);
__decorate([
    (0, nestjs_json_rpc_1.RpcMethodHandler)('get-token-info'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.QueryUserTokenData, Object]),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "getTokenInfo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('get-balances'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.QueryUserTokenData, Object]),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "getUserToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('send-token'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.SendTokenData, Object]),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "sendToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('networks.estimate-fee'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.SendTokenData, Object]),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "calculateTransaction", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('get-history'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.QueryHistoryData, Object]),
    __metadata("design:returntype", Promise)
], NetworkHandler.prototype, "getHistory", null);
NetworkHandler = __decorate([
    (0, nestjs_json_rpc_1.RpcHandler)({
        method: 'networks',
    }),
    __metadata("design:paramtypes", [networks_service_1.NetworksService])
], NetworkHandler);
exports.NetworkHandler = NetworkHandler;
//# sourceMappingURL=network.controller.js.map