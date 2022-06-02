import { Document } from 'mongoose';
export declare type ConnectionDocument = Connection & Document;
export declare class Connection {
    userId: string;
    baseUrl: string;
    createdAt: number;
}
export declare const ConnectionSchema: import("mongoose").Schema<Document<Connection, any, any>, import("mongoose").Model<Document<Connection, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=connection.schema.d.ts.map