import { Request, UseGuards } from '@nestjs/common';
import {
  RpcId,
  RpcPayload,
  RpcVersion,
  RpcMethod,
  RpcHandler,
  RpcMethodHandler,
} from '@jashkasoft/nestjs-json-rpc';
import {
  NewWalletDTO,
  ImportWalletDTO,
  RestoreWalletDTO,
  ChangeNameWalletDTO,
} from '../wallets/dto/create-wallet.dto';
import { QueryWalletData } from '../wallets/dto/get-wallets.dto';
import { WalletService } from '../wallets/wallets.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@RpcHandler({
  method: 'wallet',
})
export class WalletHandler {
  constructor(
    private readonly walletService: WalletService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('add')
  public async add(@RpcPayload() payload: NewWalletDTO, @Request() req) {
    return this.walletService.create(req.user.userId, payload.name);
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('restore')
  public async restore(@RpcPayload() payload: ImportWalletDTO, @Request() req) {
    const checkWallet = await this.walletService.checkMnemonic(
      payload.passPhase,
    );
    if (!checkWallet.status) {
      return {
        statusCode: 400,
        message: checkWallet.message,
        address: '',
        privateKey: '',
        passPhase: '',
      };
    }
    return this.walletService.restore(
      req.user.userId,
      payload.name,
      payload.passPhase,
    );
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('restore-private')
  public async restorePrivate(
    @RpcPayload() payload: RestoreWalletDTO,
    @Request() req,
  ) {
    const checkWallet = await this.walletService.checkPrivate(
      payload.privateKey,
    );
    if (!checkWallet.status) {
      return {
        statusCode: 400,
        message: checkWallet.message,
        address: '',
        privateKey: '',
        passPhase: '',
      };
    }
    return this.walletService.importPrivate(
      req.user.userId,
      payload.name,
      payload.privateKey,
    );
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('edit')
  public async changeName(
    @RpcPayload() payload: ChangeNameWalletDTO,
    @Request() req,
  ) {
    return this.walletService.changeName(req.user.userId, payload);
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('remove')
  public async removeWallet(
    @RpcPayload() payload: ChangeNameWalletDTO,
    @Request() req,
  ) {
    return this.walletService.removeWallet(req.user.userId, payload);
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('list')
  public async list(@Request() req) {
    return this.walletService.getAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('reveal')
  public async reveal(@RpcPayload() payload: QueryWalletData, @Request() req) {
    const checkPass = await this.authService.checkPassword(
      req.user.userId,
      payload.password,
    );
    if (checkPass !== true) {
      return checkPass;
    }
    return this.walletService.revealDataWallet(
      req.user.userId,
      payload.address,
      payload.type,
      payload.password,
    );
  }
}
