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
exports.ConnectionHandler = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nestjs_json_rpc_1 = require("@jashkasoft/nestjs-json-rpc");
const connection_service_1 = require("../connection/connection.service");
const connection_dto_1 = require("../connection/dto/connection.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ConnectionHandler = class ConnectionHandler {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    async connect(payload, req) {
        if (!payload.baseUrl) {
            return {
                statusCode: 400,
                message: 'connection.require_url',
            };
        }
        return await this.connectionService.createConnect(req.user.userId, payload.baseUrl);
    }
    async disconnect(payload, req) {
        if (!payload.baseUrl) {
            return {
                statusCode: 400,
                message: 'connection.require_url',
            };
        }
        return await this.connectionService.disconnect(req.user.userId, payload.baseUrl);
    }
    async getConnection(payload, req) {
        if (!payload.baseUrl) {
            return {
                statusCode: 400,
                message: 'connection.require_url',
            };
        }
        return await this.connectionService.getConnection(req.user.userId, payload.baseUrl);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('connect'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connection_dto_1.CreateConnectionDto, Object]),
    __metadata("design:returntype", Promise)
], ConnectionHandler.prototype, "connect", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('disconnect'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connection_dto_1.CreateConnectionDto, Object]),
    __metadata("design:returntype", Promise)
], ConnectionHandler.prototype, "disconnect", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, nestjs_json_rpc_1.RpcMethodHandler)('get-connection'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, nestjs_json_rpc_1.RpcPayload)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connection_dto_1.CreateConnectionDto, Object]),
    __metadata("design:returntype", Promise)
], ConnectionHandler.prototype, "getConnection", null);
ConnectionHandler = __decorate([
    (0, nestjs_json_rpc_1.RpcHandler)({
        method: 'connection',
    }),
    __metadata("design:paramtypes", [connection_service_1.ConnectionService])
], ConnectionHandler);
exports.ConnectionHandler = ConnectionHandler;
//# sourceMappingURL=connection.controller.js.map