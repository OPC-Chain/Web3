"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryUsersOrderByColumn = exports.GetUsersDto = exports.UserPaginator = void 0;
const openapi = require("@nestjs/swagger");
const generic_conditions_dto_1 = require("../../common/dto/generic-conditions.dto");
const pagination_args_dto_1 = require("../../common/dto/pagination-args.dto");
const paginator_dto_1 = require("../../common/dto/paginator.dto");
class UserPaginator extends paginator_dto_1.Paginator {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../schemas/user.schema").User] } };
    }
}
exports.UserPaginator = UserPaginator;
class GetUsersDto extends pagination_args_dto_1.PaginationArgs {
    static _OPENAPI_METADATA_FACTORY() {
        return { orderBy: { required: false, enum: require("./get-users.dto").QueryUsersOrderByColumn }, sortedBy: { required: false, enum: require("../../common/dto/generic-conditions.dto").SortOrder }, text: { required: false, type: () => String } };
    }
}
exports.GetUsersDto = GetUsersDto;
var QueryUsersOrderByColumn;
(function (QueryUsersOrderByColumn) {
    QueryUsersOrderByColumn["NAME"] = "name";
    QueryUsersOrderByColumn["CREATED_AT"] = "created_at";
    QueryUsersOrderByColumn["UPDATED_AT"] = "updated_at";
})(QueryUsersOrderByColumn = exports.QueryUsersOrderByColumn || (exports.QueryUsersOrderByColumn = {}));
//# sourceMappingURL=get-users.dto.js.map