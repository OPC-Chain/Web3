import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    UUID: string;
    password: string;
    createdAt: number;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
//# sourceMappingURL=user.schema.d.ts.map