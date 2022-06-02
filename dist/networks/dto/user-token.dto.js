"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHistoryData = exports.SendTokenData = exports.QueryUserTokenData = exports.AddTokenDto = void 0;
const openapi = require("@nestjs/swagger");
class AddTokenDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { network: { required: true, type: () => String }, name: { required: true, type: () => String }, address: { required: true, type: () => String }, type: { required: true, type: () => String }, decimals: { required: true, type: () => String }, symbol: { required: true, type: () => String } };
    }
}
exports.AddTokenDto = AddTokenDto;
class QueryUserTokenData {
    static _OPENAPI_METADATA_FACTORY() {
        return { network: { required: true, type: () => String }, address: { required: true, type: () => String } };
    }
}
exports.QueryUserTokenData = QueryUserTokenData;
class SendTokenData {
    static _OPENAPI_METADATA_FACTORY() {
        return { network: { required: true, type: () => String }, from_address: { required: true, type: () => String }, to_address: { required: true, type: () => String }, amount: { required: true, type: () => String }, token: { required: false, type: () => String }, gasPrice: { required: false, type: () => Number }, gasLimit: { required: false, type: () => Number } };
    }
}
exports.SendTokenData = SendTokenData;
class QueryHistoryData extends QueryUserTokenData {
    constructor() {
        super(...arguments);
        this.limit = 10;
        this.page = 1;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number, default: 10 }, page: { required: false, type: () => Number, default: 1 } };
    }
}
exports.QueryHistoryData = QueryHistoryData;
//# sourceMappingURL=user-token.dto.js.map