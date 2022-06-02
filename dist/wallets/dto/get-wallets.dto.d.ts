import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Wallet } from '../schemas/wallet.schema';
export declare class GetTagsDto extends PaginationArgs {
    orderBy?: QueryTagsOrderByColumn;
    sortedBy?: SortOrder;
    text?: string;
    name?: string;
    hasType?: string;
}
export declare enum QueryTagsOrderByColumn {
    CREATED_AT = "CREATED_AT",
    NAME = "NAME",
    UPDATED_AT = "UPDATED_AT"
}
export declare class NewWalletResponse {
    statusCode: number;
    address: string;
    privateKey: string;
    passPhase: string;
    message?: string;
    name?: string;
}
export declare class EditWalletResponse {
    statusCode: number;
    address: string;
    message?: string;
    name: string;
}
export declare class WalletList {
    statusCode: number;
    data: Wallet[];
    message?: string;
}
export declare class WalletResult {
    statusCode: number;
    message?: string;
    result: string;
}
export declare class QueryWalletData {
    address: string;
    type: string;
    password: string;
}
//# sourceMappingURL=get-wallets.dto.d.ts.map