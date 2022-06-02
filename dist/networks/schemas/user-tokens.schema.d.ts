import { Document } from 'mongoose';
export declare type UserTokenDocument = UserToken & Document;
export declare class UserToken {
    userId: string;
    network: string;
    name: string;
    address: string;
    type: string;
    decimals: number;
    symbol: string;
    price: string;
    createdAt: number;
}
export declare const UserTokenSchema: import("mongoose").Schema<Document<UserToken, any, any>, import("mongoose").Model<Document<UserToken, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=user-tokens.schema.d.ts.map