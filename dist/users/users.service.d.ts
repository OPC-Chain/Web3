import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
export declare class UsersService {
    private billingUserModel;
    constructor(billingUserModel: Model<UserDocument>);
    getUsers({ text, limit, page }: GetUsersDto): Promise<UserPaginator>;
    findUser(email: string): import("mongoose").Query<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, {}, UserDocument>;
    remove(id: number): string;
}
//# sourceMappingURL=users.service.d.ts.map