import { Network } from '../schemas/networks.schema';
import { Token } from '../schemas/tokens.schema';
import { UserToken } from '../schemas/user-tokens.schema';

export class NetworkList {
  statusCode: number;
  data: Network[];
  message?: string;
}

export class TokenList {
  statusCode: number;
  data: Token[];
  message?: string;
}

export class UserTokenData {
  statusCode: number;
  data: UserToken[];
  message?: string;
}

export class GetTokenData {
  statusCode: number;
  data: Token;
  message?: string;
}

export class SendTokenResponse {
  statusCode: number;
  message?: string;
  txHash: string;
  network_fee: string;
}

export class GasInfoResponse {
  statusCode: number;
  message?: string;
  gasLimit: number;
  gasPrice: number;
}
