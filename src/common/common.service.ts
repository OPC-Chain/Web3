import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Configure, ConfigureDocument } from './schemas/configure.schema';

export class CommonService {
  constructor(
    @InjectModel(Configure.name)
    private configureModel: Model<ConfigureDocument>,
  ) {}

  async getMinFee(): Promise<number> {
    const getConfig = await this.configureModel.findOne({
      key: 'min_fee',
    });
    return Number(getConfig.value);
  }
}
