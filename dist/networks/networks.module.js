"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const networks_service_1 = require("./networks.service");
const networks_schema_1 = require("./schemas/networks.schema");
const tokens_schema_1 = require("./schemas/tokens.schema");
const user_tokens_schema_1 = require("./schemas/user-tokens.schema");
const user_history_schema_1 = require("./schemas/user-history.schema");
const wallet_schema_1 = require("../wallets/schemas/wallet.schema");
const common_module_1 = require("../common/common.module");
const wallets_module_1 = require("../wallets/wallets.module");
let NetworksModule = class NetworksModule {
};
NetworksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: networks_schema_1.Network.name, schema: networks_schema_1.NetworkSchema },
                { name: tokens_schema_1.Token.name, schema: tokens_schema_1.TokenSchema },
                { name: user_tokens_schema_1.UserToken.name, schema: user_tokens_schema_1.UserTokenSchema },
                { name: user_history_schema_1.UserHistory.name, schema: user_history_schema_1.UserHistorySchema },
                { name: wallet_schema_1.Wallet.name, schema: wallet_schema_1.WalletSchema },
            ]),
            common_module_1.CommonModule,
            wallets_module_1.WalletsModule,
        ],
        providers: [networks_service_1.NetworksService],
        exports: [networks_service_1.NetworksService],
    })
], NetworksModule);
exports.NetworksModule = NetworksModule;
//# sourceMappingURL=networks.module.js.map