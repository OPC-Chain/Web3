"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAccountDto = void 0;
const openapi = require("@nestjs/swagger");
class CurrentAccountDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, url: { required: true, type: () => String } };
    }
}
exports.CurrentAccountDto = CurrentAccountDto;
//# sourceMappingURL=events.dto.js.map