import { Document } from 'mongoose';
export declare type NetworkDocument = Network & Document;
export declare class Network {
    key: string;
    name: string;
    rpcUrl: string;
    chainId: string;
    symbol: string;
    explorer: string;
    createdAt: number;
}
export declare const NetworkSchema: import("mongoose").Schema<Document<Network, any, any>, import("mongoose").Model<Document<Network, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=networks.schema.d.ts.map