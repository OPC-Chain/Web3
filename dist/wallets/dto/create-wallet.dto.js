"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewWalletResponse = exports.ChangeNameWalletDTO = exports.RestoreWalletDTO = exports.ImportWalletDTO = exports.NewWalletDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const wallet_schema_1 = require("../schemas/wallet.schema");
class NewWalletDTO extends (0, swagger_1.PickType)(wallet_schema_1.Wallet, ['name']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.NewWalletDTO = NewWalletDTO;
class ImportWalletDTO extends (0, swagger_1.PickType)(wallet_schema_1.Wallet, ['name', 'passPhase']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ImportWalletDTO = ImportWalletDTO;
class RestoreWalletDTO extends (0, swagger_1.PickType)(wallet_schema_1.Wallet, [
    'name',
    'privateKey',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.RestoreWalletDTO = RestoreWalletDTO;
class ChangeNameWalletDTO extends (0, swagger_1.PickType)(wallet_schema_1.Wallet, [
    'name',
    'address',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ChangeNameWalletDTO = ChangeNameWalletDTO;
class NewWalletResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, address: { required: true, type: () => String }, privateKey: { required: true, type: () => String }, passPhase: { required: true, type: () => String } };
    }
}
exports.NewWalletResponse = NewWalletResponse;
//# sourceMappingURL=create-wallet.dto.js.map