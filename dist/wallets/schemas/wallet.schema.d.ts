import { Document } from 'mongoose';
export declare type WalletDocument = Wallet & Document;
export declare class Wallet {
    address: string;
    name: string;
    privateKey: string;
    publicKey: string;
    passPhase: string;
    userId: string;
    createdAt: number;
}
export declare const WalletSchema: import("mongoose").Schema<Document<Wallet, any, any>, import("mongoose").Model<Document<Wallet, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=wallet.schema.d.ts.map