import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { User, UserDocument } from '../users/schemas/user.schema';
import {
  LoginDto,
  NewWalletDTO,
  RestoreWalletDTO,
  NewAccResponse,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { WalletService } from 'src/wallets/wallets.service';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly walletService: WalletService,
  ) {}

  async createWallet(
    newWallet: NewWalletDTO,
    restore?: string,
  ): Promise<NewAccResponse> {
    if (!newWallet.password) {
      return {
        statusCode: 400,
        message: 'user.new.require_password',
        UUID: '',
        token: '',
      };
    }
    const newUUID = uuidv4();
    const hashedPassword = await hash(newWallet.password, 12);
    const createdUser = await this.userModel.create({
      UUID: newUUID,
      password: hashedPassword,
    });
    const payload = {
      sub: createdUser._id.toString(),
      role: 'staff',
    };
    if (restore) {
      await this.walletService.restore(createdUser._id.toString(), '', restore);
    }
    return {
      statusCode: 200,
      UUID: newUUID,
      token: this.jwtService.sign(payload),
    };
  }

  async login(loginInput: LoginDto): Promise<NewAccResponse> {
    console.log(loginInput);
    const findUser = await this.userModel.findOne({
      UUID: loginInput.UUID,
    });
    console.log(findUser);
    if (!findUser) {
      return {
        statusCode: 404,
        message: 'user.new.not_found_user',
        UUID: '',
        token: '',
      };
    }
    const isMatch = await compare(loginInput.password, findUser.password);
    if (!isMatch) {
      return {
        statusCode: 400,
        message: 'user.new.wrong_credential',
        UUID: '',
        token: '',
      };
    }
    const payload = {
      sub: findUser._id.toString(),
      role: 'staff',
    };
    return {
      statusCode: 200,
      UUID: loginInput.UUID,
      token: this.jwtService.sign(payload),
      numberWallets: await this.walletService.getAmountWallet(
        findUser._id.toString(),
      ),
    };
  }

  async checkPassword(userId: string, password: string) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) {
      return {
        statusCode: 404,
        message: 'user.not_found_user',
      };
    }
    const isMatch = await compare(password, findUser.password);
    if (!isMatch) {
      return {
        statusCode: 400,
        message: 'user.wrong_credential',
      };
    }
    return true;
  }
}
