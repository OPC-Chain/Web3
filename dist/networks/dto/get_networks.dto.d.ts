import { Network } from '../schemas/networks.schema';
import { Token } from '../schemas/tokens.schema';
import { UserToken } from '../schemas/user-tokens.schema';
export declare class NetworkList {
    statusCode: number;
    data: Network[];
    message?: string;
}
export declare class TokenList {
    statusCode: number;
    data: Token[];
    message?: string;
}
export declare class UserTokenData {
    statusCode: number;
    data: UserToken[];
    message?: string;
}
export declare class GetTokenData {
    statusCode: number;
    data: Token;
    message?: string;
}
export declare class SendTokenResponse {
    statusCode: number;
    message?: string;
    txHash: string;
    network_fee: string;
}
export declare class GasInfoResponse {
    statusCode: number;
    message?: string;
    gasLimit: number;
    gasPrice: number;
}
//# sourceMappingURL=get_networks.dto.d.ts.map