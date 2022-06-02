import { PickType } from '@nestjs/swagger';
import { Wallet } from '../schemas/wallet.schema';

export class NewWalletDTO extends PickType(Wallet, ['name']) {}
export class ImportWalletDTO extends PickType(Wallet, ['name', 'passPhase']) {}
export class RestoreWalletDTO extends PickType(Wallet, [
  'name',
  'privateKey',
]) {}
export class ChangeNameWalletDTO extends PickType(Wallet, [
  'name',
  'address',
]) {}

export class NewWalletResponse {
  statusCode: number;
  address: string;
  privateKey: string;
  passPhase: string;
}
