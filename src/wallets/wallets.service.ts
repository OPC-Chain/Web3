import { Injectable, Logger } from '@nestjs/common';
import { ethers, utils } from 'ethers';
import * as bip39 from 'bip39';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { paginate } from 'src/common/pagination/paginate';
import { ChangeNameWalletDTO } from './dto/create-wallet.dto';
import { SuccessResponse } from 'src/common/dto/success-response.dto';
import {
  NewWalletResponse,
  EditWalletResponse,
  WalletList,
  WalletResult,
} from './dto/get-wallets.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private walletModel: Model<WalletDocument>,
  ) {}

  async create(userId: string, name: string): Promise<NewWalletResponse> {
    try {
      const mnemonic = bip39.generateMnemonic();
      const walletIns = utils.HDNode.fromMnemonic(mnemonic);
      const createdWallet = await this.walletModel.create({
        address: walletIns.address,
        name: name || 'Wallet 1',
        privateKey: walletIns.privateKey,
        publicKey: walletIns.publicKey,
        passPhase: mnemonic,
        userId,
        createdAt: Date.now(),
      });
      return {
        statusCode: 200,
        name: name || 'Wallet 1',
        address: createdWallet.address,
        privateKey: createdWallet.privateKey,
        passPhase: createdWallet.passPhase,
      };
    } catch (error) {
      Logger.error('WalletService - create', error);
      return {
        statusCode: 500,
        message: 'wallet.add.fail',
        address: '',
        privateKey: '',
        passPhase: '',
      };
    }
  }

  async restore(
    userId: string,
    name: string,
    phrase: string,
  ): Promise<NewWalletResponse> {
    try {
      const walletIns = utils.HDNode.fromMnemonic(phrase);
      const createdWallet = await this.walletModel.create({
        address: walletIns.address,
        name: name || 'Wallet 1',
        privateKey: walletIns.privateKey,
        publicKey: walletIns.publicKey,
        passPhase: phrase,
        userId,
        createdAt: Date.now(),
      });
      return {
        statusCode: 200,
        address: createdWallet.address,
        privateKey: createdWallet.privateKey,
        passPhase: createdWallet.passPhase,
      };
    } catch (error) {
      Logger.error('WalletService - create', error);
      return {
        statusCode: 500,
        message: 'wallet.add.fail',
        address: '',
        privateKey: '',
        passPhase: '',
      };
    }
  }

  async importPrivate(
    userId: string,
    name: string,
    privateKey: string,
  ): Promise<NewWalletResponse> {
    try {
      const walletIns = new ethers.Wallet(privateKey);
      const createdWallet = await this.walletModel.create({
        address: walletIns.address,
        name: name || 'Wallet 1',
        privateKey,
        publicKey: walletIns.publicKey,
        passPhase: '',
        userId,
        createdAt: Date.now(),
      });
      return {
        statusCode: 200,
        address: createdWallet.address,
        privateKey: createdWallet.privateKey,
        passPhase: '',
      };
    } catch (error) {
      Logger.error('WalletService - create', error);
      return {
        statusCode: 500,
        message: 'wallet.add.fail',
        address: '',
        privateKey: '',
        passPhase: '',
      };
    }
  }

  async changeName(
    userId: string,
    inputEdit: ChangeNameWalletDTO,
  ): Promise<EditWalletResponse> {
    try {
      const findWallet = await this.walletModel.findOne({
        userId,
        address: ethers.utils.getAddress(inputEdit.address),
      });
      if (!findWallet) {
        return {
          statusCode: 404,
          message: 'wallet.edit.not_found_wallet',
          ...inputEdit,
        };
      }
      findWallet.name = inputEdit.name;
      await findWallet.save();
      return {
        ...inputEdit,
        statusCode: 200,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'wallet.edit.fail',
        address: '',
        name: '',
      };
    }
  }

  async removeWallet(
    userId: string,
    inputEdit: ChangeNameWalletDTO,
  ): Promise<EditWalletResponse> {
    try {
      const findWallet = await this.walletModel.findOne({
        userId,
        address: ethers.utils.getAddress(inputEdit.address),
      });
      if (!findWallet) {
        return {
          statusCode: 404,
          message: 'wallet.remove.not_found_wallet',
          ...inputEdit,
        };
      }
      findWallet.userId = '';
      await findWallet.save();

      return {
        statusCode: 200,
        message: '',
        ...inputEdit,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'wallet.remove.fail',
        address: '',
        name: '',
      };
    }
  }

  async getAmountWallet(userId: string): Promise<number> {
    try {
      return this.walletModel.countDocuments({ userId });
    } catch (error) {
      return 0;
    }
  }
  async getAll(userId: string): Promise<WalletList> {
    try {
      const walletList = await this.walletModel
        .find({ userId })
        .select('address name');
      return {
        statusCode: 200,
        data: walletList,
      };
    } catch (error) {
      Logger.error('WalletService - getAll', error);
      return {
        statusCode: 500,
        message: 'wallet.list.fail',
        data: [],
      };
    }
  }

  async getUser(userId: string): Promise<Wallet> {
    try {
      const wallet = await this.walletModel.findOne({ userId });
      wallet.passPhase = undefined;
      wallet.publicKey = undefined;
      wallet.privateKey = undefined;
      return wallet;
    } catch (error) {
      Logger.error('WalletService - getUser', error);
      return undefined;
    }
  }

  async revealDataWallet(
    userId: string,
    address: string,
    type: string,
    password: string,
  ): Promise<WalletResult> {
    try {
      const foundWallet = await this.walletModel.findOne({
        userId,
        address: ethers.utils.getAddress(address),
      });
      if (foundWallet) {
        return {
          statusCode: 200,
          result: foundWallet[type],
        };
      }
      return {
        statusCode: 404,
        message: 'wallet.data.not_found_wallet',
        result: '',
      };
    } catch (error) {
      Logger.error('WalletService - revealDataWallet', error);
      return {
        statusCode: 500,
        message: 'wallet.data.fail',
        result: '',
      };
    }
  }

  checkMnemonic(phrase) {
    try {
      const walletWithPhrase = ethers.Wallet.fromMnemonic(phrase);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
        message: 'wallet.restore.invalid_mnemonic',
      };
    }
  }

  checkPrivate(privateKey) {
    try {
      const walletWithPrivate = new ethers.Wallet(privateKey);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
        message: 'wallet.restore.invalid_privateKey',
      };
    }
  }

  // findAll({ page, limit }: GetTagsDto) {
  //   if (!page) page = 1;
  //   const url = `/tags?limit=${limit}`;
  //   return {
  //     data: this.tags,
  //     ...paginate(this.tags.length, page, limit, this.tags.length, url),
  //   };
  // }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return this.tags[0];
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tag`;
  // }
}
