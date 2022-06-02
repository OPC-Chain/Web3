import { Request, UseGuards } from '@nestjs/common';
import {
  RpcId,
  RpcPayload,
  RpcVersion,
  RpcMethod,
  RpcHandler,
  RpcMethodHandler,
} from '@jashkasoft/nestjs-json-rpc';
import { NetworksService } from '../networks/networks.service';
import { WalletService } from '../wallets/wallets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  AddTokenDto,
  QueryUserTokenData,
  SendTokenData,
  QueryHistoryData,
} from '../networks/dto/user-token.dto';

@RpcHandler({
  method: 'networks',
})
export class NetworkHandler {
  constructor(private readonly networkService: NetworksService) {}

  @RpcMethodHandler('list')
  public async list() {
    return this.networkService.list();
  }

  @RpcMethodHandler('tokens')
  public async listTokens() {
    return this.networkService.listToken();
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('add-token')
  public async addToken(@RpcPayload() payload: AddTokenDto, @Request() req) {
    return this.networkService.addToken(payload, req.user.userId);
  }

  // @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('get-token-info')
  public async getTokenInfo(
    @RpcPayload() payload: QueryUserTokenData,
    @Request() req,
  ) {
    return this.networkService.getTokenInfo(payload);
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('get-balances')
  public async getUserToken(
    @RpcPayload() payload: QueryUserTokenData,
    @Request() req,
  ) {
    return this.networkService.listUserToken(
      payload.network,
      payload.address,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('send-token')
  public async sendToken(@RpcPayload() payload: SendTokenData, @Request() req) {
    return this.networkService.sendToken(
      payload.network,
      payload.from_address,
      payload.to_address,
      req.user.userId,
      payload.amount,
      payload.token,
      payload.gasPrice,
      payload.gasLimit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('networks.estimate-fee')
  public async calculateTransaction(
    @RpcPayload() payload: SendTokenData,
    @Request() req,
  ) {
    return this.networkService.calculateTransaction(
      payload.network,
      payload.from_address,
      payload.to_address,
      req.user.userId,
      payload.amount,
      payload.token
    );
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('get-history')
  public async getHistory(
    @RpcPayload() payload: QueryHistoryData,
    @Request() req,
  ) {
    return this.networkService.getHistory(
      payload.network,
      payload.address,
      req.user.userId,
      payload.page,
      payload.limit,
    );
  }
}
