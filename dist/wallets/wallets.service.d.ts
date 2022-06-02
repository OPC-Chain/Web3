import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { ChangeNameWalletDTO } from './dto/create-wallet.dto';
import { NewWalletResponse, EditWalletResponse, WalletList, WalletResult } from './dto/get-wallets.dto';
export declare class WalletService {
    private walletModel;
    constructor(walletModel: Model<WalletDocument>);
    create(userId: string, name: string): Promise<NewWalletResponse>;
    restore(userId: string, name: string, phrase: string): Promise<NewWalletResponse>;
    importPrivate(userId: string, name: string, privateKey: string): Promise<NewWalletResponse>;
    changeName(userId: string, inputEdit: ChangeNameWalletDTO): Promise<EditWalletResponse>;
    removeWallet(userId: string, inputEdit: ChangeNameWalletDTO): Promise<EditWalletResponse>;
    getAmountWallet(userId: string): Promise<number>;
    getAll(userId: string): Promise<WalletList>;
    getUser(userId: string): Promise<Wallet>;
    revealDataWallet(userId: string, address: string, type: string, password: string): Promise<WalletResult>;
    checkMnemonic(phrase: any): {
        status: boolean;
        message?: undefined;
    } | {
        status: boolean;
        message: string;
    };
    checkPrivate(privateKey: any): {
        status: boolean;
        message?: undefined;
    } | {
        status: boolean;
        message: string;
    };
}
//# sourceMappingURL=wallets.service.d.ts.map