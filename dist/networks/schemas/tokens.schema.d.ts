import { Document } from 'mongoose';
export declare type TokenDocument = Token & Document;
export declare class Token {
    network: string;
    name: string;
    address: string;
    type: string;
    decimals: number;
    symbol: string;
    price: string;
    imgUrl: string;
    balance: string;
    createdAt: number;
}
export declare const TokenSchema: import("mongoose").Schema<Document<Token, any, any>, import("mongoose").Model<Document<Token, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=tokens.schema.d.ts.map