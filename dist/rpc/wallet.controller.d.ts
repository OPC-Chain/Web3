import { NewWalletDTO, ImportWalletDTO, RestoreWalletDTO, ChangeNameWalletDTO } from '../wallets/dto/create-wallet.dto';
import { QueryWalletData } from '../wallets/dto/get-wallets.dto';
import { WalletService } from '../wallets/wallets.service';
import { AuthService } from '../auth/auth.service';
export declare class WalletHandler {
    private readonly walletService;
    private readonly authService;
    constructor(walletService: WalletService, authService: AuthService);
    add(payload: NewWalletDTO, req: any): Promise<import("../wallets/dto/get-wallets.dto").NewWalletResponse>;
    restore(payload: ImportWalletDTO, req: any): Promise<import("../wallets/dto/get-wallets.dto").NewWalletResponse>;
    restorePrivate(payload: RestoreWalletDTO, req: any): Promise<import("../wallets/dto/get-wallets.dto").NewWalletResponse>;
    changeName(payload: ChangeNameWalletDTO, req: any): Promise<import("../wallets/dto/get-wallets.dto").EditWalletResponse>;
    removeWallet(payload: ChangeNameWalletDTO, req: any): Promise<import("../wallets/dto/get-wallets.dto").EditWalletResponse>;
    list(req: any): Promise<import("../wallets/dto/get-wallets.dto").WalletList>;
    reveal(payload: QueryWalletData, req: any): Promise<import("../wallets/dto/get-wallets.dto").WalletResult | {
        statusCode: number;
        message: string;
    }>;
}
//# sourceMappingURL=wallet.controller.d.ts.map