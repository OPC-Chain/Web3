import { NewWalletDTO, RestoreWalletDTO, LoginDto } from '../auth/dto/create-auth.dto';
import { AuthService } from '../auth/auth.service';
import { WalletService } from 'src/wallets/wallets.service';
export declare class UserHandler {
    private readonly authService;
    private readonly walletService;
    constructor(authService: AuthService, walletService: WalletService);
    create(payload: NewWalletDTO, id: string, req: any): Promise<import("../auth/dto/create-auth.dto").NewAccResponse>;
    restore(payload: RestoreWalletDTO, id: string, req: any): Promise<import("../auth/dto/create-auth.dto").NewAccResponse>;
    verify(payload: LoginDto): Promise<import("../auth/dto/create-auth.dto").NewAccResponse>;
}
//# sourceMappingURL=user.controller.d.ts.map