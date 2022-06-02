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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const connection_service_1 = require("../connection/connection.service");
let EventGateway = class EventGateway {
    constructor(connectionService) {
        this.connectionService = connectionService;
        this.currentAccount = async (userId, url) => {
            const isConnected = await this.connectionService.getConnection(userId, url);
            if (isConnected.data) {
                return isConnected;
            }
            if (!isConnected.data) {
                return await this.connectionService.createConnect(userId, url);
            }
        };
        this.handleConnect = async (userId, url) => {
            return await this.currentAccount(userId, url);
        };
    }
    async handleDisconnect(userId, url) {
        return await this.connectionService.disconnect(userId, url);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], EventGateway.prototype, "server", void 0);
EventGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        allowEIO3: true,
    }),
    __metadata("design:paramtypes", [connection_service_1.ConnectionService])
], EventGateway);
exports.EventGateway = EventGateway;
//# sourceMappingURL=events.gateway.js.map