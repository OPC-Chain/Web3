import { Wallet } from '../schemas/wallet.schema';
declare const NewWalletDTO_base: import("@nestjs/common").Type<Pick<Wallet, "name">>;
export declare class NewWalletDTO extends NewWalletDTO_base {
}
declare const ImportWalletDTO_base: import("@nestjs/common").Type<Pick<Wallet, "name" | "passPhase">>;
export declare class ImportWalletDTO extends ImportWalletDTO_base {
}
declare const RestoreWalletDTO_base: import("@nestjs/common").Type<Pick<Wallet, "name" | "privateKey">>;
export declare class RestoreWalletDTO extends RestoreWalletDTO_base {
}
declare const ChangeNameWalletDTO_base: import("@nestjs/common").Type<Pick<Wallet, "name" | "address">>;
export declare class ChangeNameWalletDTO extends ChangeNameWalletDTO_base {
}
export declare class NewWalletResponse {
    statusCode: number;
    address: string;
    privateKey: string;
    passPhase: string;
}
export {};
//# sourceMappingURL=create-wallet.dto.d.ts.map