import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Connection, ConnectionDocument } from './schemas/connection.schema';
import { CreateConnectionDto } from './dto/connection.dto';
import { URL } from 'url';
import { WalletService } from 'src/wallets/wallets.service';
import { NetworksService } from 'src/networks/networks.service';
import { ethers, Wallet } from "ethers";

@Injectable()
export class ConnectionService implements OnModuleInit{
  constructor(
    @InjectModel(Connection.name) private connectionModel: Model<ConnectionDocument>,
    private walletService: WalletService,
    private networksService: NetworksService,
  ) { }
  private providerOpc 

  async onModuleInit() {
    const OPC = await this.networksService.list()
    this.providerOpc = new ethers.providers.JsonRpcProvider(
      OPC.data[0].rpcUrl
    );
  }

  async getConnection(userId: string, url: string): Promise<any> {
    const baseUrl = new URL(url)
    const isConnected = await this.connectionModel.findOne({
      userId,
      baseUrl: baseUrl.origin,
    })
    if (isConnected) {
      const info = await this.walletService.getUser(userId)
      const balance = (await this.providerOpc.getBalance(info.address)).toLocaleString('fullwide', { useGrouping: false })
      return {
        statusCode: 200,
        data: {info, balance},
      }
    }
    return {
      statusCode: 200,
      data: '',
    }
  }

  async createConnect(userId: string, url: string): Promise<any> {
    const baseUrl = new URL(url)
    const isConnected = await this.connectionModel.findOne({
      userId,
      baseUrl: baseUrl.origin,
    })
    if (isConnected) {
      throw new HttpException('USER_CONNECTED', 400);
    }
    const connection = await this.connectionModel.create({
      userId,
      baseUrl: baseUrl.origin,
    })
    return connection;
  }

  async disconnect(userId: string, url: string) {
    const baseUrl = new URL(url)
    const disconnect = await this.connectionModel.findOneAndDelete({
      userId,
      baseUrl: baseUrl.origin,
    })
    return disconnect;
  }

}
