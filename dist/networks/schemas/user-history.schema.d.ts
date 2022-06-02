import { Document } from 'mongoose';
export declare type UserHistoryDocument = UserHistory & Document;
export declare class UserHistory {
    userId: string;
    network: string;
    action: string;
    from_address: string;
    to_address: string;
    token: string;
    symbol: string;
    amount: string;
    data: string;
    txHash: string;
    network_fee: string;
    createdAt: number;
}
export declare const UserHistorySchema: import("mongoose").Schema<Document<UserHistory, any, any>, import("mongoose").Model<Document<UserHistory, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=user-history.schema.d.ts.map