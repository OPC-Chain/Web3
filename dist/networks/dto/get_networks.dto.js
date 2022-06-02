"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasInfoResponse = exports.SendTokenResponse = exports.GetTokenData = exports.UserTokenData = exports.TokenList = exports.NetworkList = void 0;
const openapi = require("@nestjs/swagger");
class NetworkList {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, data: { required: true, type: () => [require("../schemas/networks.schema").Network] }, message: { required: false, type: () => String } };
    }
}
exports.NetworkList = NetworkList;
class TokenList {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, data: { required: true, type: () => [require("../schemas/tokens.schema").Token] }, message: { required: false, type: () => String } };
    }
}
exports.TokenList = TokenList;
class UserTokenData {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, data: { required: true, type: () => [require("../schemas/user-tokens.schema").UserToken] }, message: { required: false, type: () => String } };
    }
}
exports.UserTokenData = UserTokenData;
class GetTokenData {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, data: { required: true, type: () => require("../schemas/tokens.schema").Token }, message: { required: false, type: () => String } };
    }
}
exports.GetTokenData = GetTokenData;
class SendTokenResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, message: { required: false, type: () => String }, txHash: { required: true, type: () => String }, network_fee: { required: true, type: () => String } };
    }
}
exports.SendTokenResponse = SendTokenResponse;
class GasInfoResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, message: { required: false, type: () => String }, gasLimit: { required: true, type: () => Number }, gasPrice: { required: true, type: () => Number } };
    }
}
exports.GasInfoResponse = GasInfoResponse;
//# sourceMappingURL=get_networks.dto.js.map