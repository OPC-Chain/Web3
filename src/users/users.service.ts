import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';

import { paginate } from 'src/common/pagination/paginate';

const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private billingUserModel: Model<UserDocument>,
  ) {}

  async getUsers({ text, limit, page }: GetUsersDto): Promise<UserPaginator> {
    if (!page) page = 1;

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // let data: User[] = this.users;
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // const results = data.slice(startIndex, endIndex);
    // console.log('getUsers', { text, limit, page });
    let query = {};
    if (text) {
      query = {
        $or: [
          { name: { $regex: text, $options: 'i' } },
          { email: { $regex: text, $options: 'i' } },
        ],
      };
    }
    const results = await this.billingUserModel
      .find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const totalDoc = await this.billingUserModel.countDocuments(query);
    const url = `/users?limit=${limit}`;

    return {
      data: results,
      ...paginate(totalDoc, page, limit, results.length, url),
    };
  }
  // findOne(id: number) {
  //   return this.users.find((user) => user._id === id);
  // }

  findUser(email: string) {
    return this.billingUserModel.findOne({ email });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
