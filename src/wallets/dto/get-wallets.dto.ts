import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
import { Wallet } from '../schemas/wallet.schema';

export class GetTagsDto extends PaginationArgs {
  orderBy?: QueryTagsOrderByColumn;
  sortedBy?: SortOrder;
  text?: string;
  name?: string;
  hasType?: string;
}

export enum QueryTagsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}

export class NewWalletResponse {
  statusCode: number;
  address: string;
  privateKey: string;
  passPhase: string;
  message?: string;
  name?: string;
}

export class EditWalletResponse {
  statusCode: number;
  address: string;
  message?: string;
  name: string;
}

export class WalletList {
  statusCode: number;
  data: Wallet[];
  message?: string;
}

export class WalletResult {
  statusCode: number;
  message?: string;
  result: string;
}

export class QueryWalletData {
  address: string;
  type: string;
  password: string;
}
