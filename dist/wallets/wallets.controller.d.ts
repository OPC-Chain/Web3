import { WalletService } from './wallets.service';
import { NewWalletDTO } from './dto/create-wallet.dto';
import { NewWalletResponse, WalletList } from './dto/get-wallets.dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    create(req: any, newWalletDTO: NewWalletDTO): Promise<NewWalletResponse>;
    getAll(req: any): Promise<WalletList>;
}
//# sourceMappingURL=wallets.controller.d.ts.map