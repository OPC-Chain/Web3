export class AddTokenDto {
  network: string;
  name: string;
  address: string;
  type: string;
  decimals: string;
  symbol: string;
}

export class QueryUserTokenData {
  network: string;
  address: string;
}

export class SendTokenData {
  network: string;
  from_address: string;
  to_address: string;
  amount: string;
  token?: string;
  gasPrice?: number;
  gasLimit?: number;
}

export class QueryHistoryData extends QueryUserTokenData {
  limit?: number = 10;
  page?: number = 1;
}
