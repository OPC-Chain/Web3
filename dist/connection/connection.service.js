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
exports.ConnectionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const connection_schema_1 = require("./schemas/connection.schema");
const url_1 = require("url");
const wallets_service_1 = require("../wallets/wallets.service");
const networks_service_1 = require("../networks/networks.service");
const ethers_1 = require("ethers");
let ConnectionService = class ConnectionService {
    constructor(connectionModel, walletService, networksService) {
        this.connectionModel = connectionModel;
        this.walletService = walletService;
        this.networksService = networksService;
    }
    async onModuleInit() {
        const OPC = await this.networksService.list();
        this.providerOpc = new ethers_1.ethers.providers.JsonRpcProvider(OPC.data[0].rpcUrl);
    }
    async getConnection(userId, url) {
        const baseUrl = new url_1.URL(url);
        const isConnected = await this.connectionModel.findOne({
            userId,
            baseUrl: baseUrl.origin,
        });
        if (isConnected) {
            const info = await this.walletService.getUser(userId);
            const balance = (await this.providerOpc.getBalance(info.address)).toLocaleString('fullwide', { useGrouping: false });
            return {
                statusCode: 200,
                data: { info, balance },
            };
        }
        return {
            statusCode: 200,
            data: '',
        };
    }
    async createConnect(userId, url) {
        const baseUrl = new url_1.URL(url);
        const isConnected = await this.connectionModel.findOne({
            userId,
            baseUrl: baseUrl.origin,
        });
        if (isConnected) {
            throw new common_1.HttpException('USER_CONNECTED', 400);
        }
        const connection = await this.connectionModel.create({
            userId,
            baseUrl: baseUrl.origin,
        });
        return connection;
    }
    async disconnect(userId, url) {
        const baseUrl = new url_1.URL(url);
        const disconnect = await this.connectionModel.findOneAndDelete({
            userId,
            baseUrl: baseUrl.origin,
        });
        return disconnect;
    }
};
ConnectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(connection_schema_1.Connection.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        wallets_service_1.WalletService,
        networks_service_1.NetworksService])
], ConnectionService);
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map