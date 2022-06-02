import { Request, UseGuards } from '@nestjs/common';
import {
  RpcId,
  RpcPayload,
  RpcVersion,
  RpcMethod,
  IRpcHandler,
  RpcHandler,
  RpcMethodHandler,
} from '@jashkasoft/nestjs-json-rpc';
import {
  NewWalletDTO,
  RestoreWalletDTO,
  LoginDto,
} from '../auth/dto/create-auth.dto';
import { AuthService } from '../auth/auth.service';
import { WalletService } from 'src/wallets/wallets.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@RpcHandler({
  method: 'user',
})
export class UserHandler {
  constructor(
    private readonly authService: AuthService,
    private readonly walletService: WalletService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('new')
  public async create(
    @RpcPayload() payload: NewWalletDTO,
    @RpcId() id: string,
    @Request() req,
  ) {
    return this.authService.createWallet(payload);
  }

  @RpcMethodHandler('restore')
  public async restore(
    @RpcPayload() payload: RestoreWalletDTO,
    @RpcId() id: string,
    @Request() req,
  ) {
    if (!payload.password) {
      return {
        statusCode: 400,
        message: 'user.restore.require_password',
        UUID: '',
        token: '',
      };
    }
    const checkWallet = await this.walletService.checkMnemonic(
      payload.passPhase,
    );
    if (!checkWallet.status) {
      return {
        statusCode: 400,
        message: checkWallet.message,
        UUID: '',
        token: '',
      };
    }
    return this.authService.createWallet(payload, payload.passPhase);
  }

  @RpcMethodHandler('verify')
  public async verify(@RpcPayload() payload: LoginDto) {
    return this.authService.login(payload);
  }
}
