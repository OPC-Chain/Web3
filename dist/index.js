"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsModule = exports.AuthModule = exports.UsersModule = exports.NetworksModule = exports.ConnectionModule = exports.EventsModule = exports.EventGateway = void 0;
const events_gateway_1 = require("./events/events.gateway");
Object.defineProperty(exports, "EventGateway", { enumerable: true, get: function () { return events_gateway_1.EventGateway; } });
const users_module_1 = require("./users/users.module");
Object.defineProperty(exports, "UsersModule", { enumerable: true, get: function () { return users_module_1.UsersModule; } });
const auth_module_1 = require("./auth/auth.module");
Object.defineProperty(exports, "AuthModule", { enumerable: true, get: function () { return auth_module_1.AuthModule; } });
const wallets_module_1 = require("./wallets/wallets.module");
Object.defineProperty(exports, "WalletsModule", { enumerable: true, get: function () { return wallets_module_1.WalletsModule; } });
const networks_module_1 = require("./networks/networks.module");
Object.defineProperty(exports, "NetworksModule", { enumerable: true, get: function () { return networks_module_1.NetworksModule; } });
const connection_module_1 = require("./connection/connection.module");
Object.defineProperty(exports, "ConnectionModule", { enumerable: true, get: function () { return connection_module_1.ConnectionModule; } });
const events_module_1 = require("./events/events.module");
Object.defineProperty(exports, "EventsModule", { enumerable: true, get: function () { return events_module_1.EventsModule; } });
//# sourceMappingURL=index.js.map