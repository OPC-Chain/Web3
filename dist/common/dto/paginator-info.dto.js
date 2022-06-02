"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatorInfo = void 0;
const openapi = require("@nestjs/swagger");
class PaginatorInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { count: { required: true, type: () => Number }, currentPage: { required: true, type: () => Number }, firstItem: { required: true, type: () => Number }, lastItem: { required: true, type: () => Number }, lastPage: { required: true, type: () => Number }, perPage: { required: true, type: () => Number }, total: { required: true, type: () => Number } };
    }
}
exports.PaginatorInfo = PaginatorInfo;
//# sourceMappingURL=paginator-info.dto.js.map