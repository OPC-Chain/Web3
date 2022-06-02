"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryWalletData = exports.WalletResult = exports.WalletList = exports.EditWalletResponse = exports.NewWalletResponse = exports.QueryTagsOrderByColumn = exports.GetTagsDto = void 0;
const openapi = require("@nestjs/swagger");
const generic_conditions_dto_1 = require("../../common/dto/generic-conditions.dto");
const pagination_args_dto_1 = require("../../common/dto/pagination-args.dto");
const paginator_dto_1 = require("../../common/dto/paginator.dto");
class GetTagsDto extends pagination_args_dto_1.PaginationArgs {
    static _OPENAPI_METADATA_FACTORY() {
        return { orderBy: { required: false, enum: require("./get-wallets.dto").QueryTagsOrderByColumn }, sortedBy: { required: false, enum: require("../../common/dto/generic-conditions.dto").SortOrder }, text: { required: false, type: () => String }, name: { required: false, type: () => String }, hasType: { required: false, type: () => String } };
    }
}
exports.GetTagsDto = GetTagsDto;
var QueryTagsOrderByColumn;
(function (QueryTagsOrderByColumn) {
    QueryTagsOrderByColumn["CREATED_AT"] = "CREATED_AT";
    QueryTagsOrderByColumn["NAME"] = "NAME";
    QueryTagsOrderByColumn["UPDATED_AT"] = "UPDATED_AT";
})(QueryTagsOrderByColumn = exports.QueryTagsOrderByColumn || (exports.QueryTagsOrderByColumn = {}));
class NewWalletResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, address: { required: true, type: () => String }, privateKey: { required: true, type: () => String }, passPhase: { required: true, type: () => String }, message: { required: false, type: () => String }, name: { required: false, type: () => String } };
    }
}
exports.NewWalletResponse = NewWalletResponse;
class EditWalletResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, address: { required: true, type: () => String }, message: { required: false, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.EditWalletResponse = EditWalletResponse;
class WalletList {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, data: { required: true, type: () => [require("../schemas/wallet.schema").Wallet] }, message: { required: false, type: () => String } };
    }
}
exports.WalletList = WalletList;
class WalletResult {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, message: { required: false, type: () => String }, result: { required: true, type: () => String } };
    }
}
exports.WalletResult = WalletResult;
class QueryWalletData {
    static _OPENAPI_METADATA_FACTORY() {
        return { address: { required: true, type: () => String }, type: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.QueryWalletData = QueryWalletData;
//# sourceMappingURL=get-wallets.dto.js.map