"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_json_rpc_1 = require("@jashkasoft/nestjs-json-rpc");
const user_controller_1 = require("./rpc/user.controller");
const wallet_controller_1 = require("./rpc/wallet.controller");
const network_controller_1 = require("./rpc/network.controller");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const wallets_module_1 = require("./wallets/wallets.module");
const networks_module_1 = require("./networks/networks.module");
const connection_module_1 = require("./connection/connection.module");
const connection_controller_1 = require("./rpc/connection.controller");
const events_module_1 = require("./events/events.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                expandVariables: true,
                load: [],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('mongo_uri'),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
                inject: [config_1.ConfigService],
            }),
            nestjs_json_rpc_1.JsonRpcModule.forRoot({
                path: '/json-rpc',
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            wallets_module_1.WalletsModule,
            networks_module_1.NetworksModule,
            connection_module_1.ConnectionModule,
            events_module_1.EventsModule,
        ],
        controllers: [],
        providers: [user_controller_1.UserHandler, wallet_controller_1.WalletHandler, network_controller_1.NetworkHandler, connection_controller_1.ConnectionHandler],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map