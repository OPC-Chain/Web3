export declare class AddTokenDto {
    network: string;
    name: string;
    address: string;
    type: string;
    decimals: string;
    symbol: string;
}
export declare class QueryUserTokenData {
    network: string;
    address: string;
}
export declare class SendTokenData {
    network: string;
    from_address: string;
    to_address: string;
    amount: string;
    token?: string;
    gasPrice?: number;
    gasLimit?: number;
}
export declare class QueryHistoryData extends QueryUserTokenData {
    limit?: number;
    page?: number;
}
//# sourceMappingURL=user-token.dto.d.ts.map