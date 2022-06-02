import { Document } from 'mongoose';
export declare type ConfigureDocument = Configure & Document;
export declare class Configure {
    key: string;
    value: string;
}
export declare const ConfigureSchema: import("mongoose").Schema<Document<Configure, any, any>, import("mongoose").Model<Document<Configure, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=configure.schema.d.ts.map