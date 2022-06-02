import { NetworksService } from '../networks/networks.service';
import { AddTokenDto, QueryUserTokenData, SendTokenData, QueryHistoryData } from '../networks/dto/user-token.dto';
export declare class NetworkHandler {
    private readonly networkService;
    constructor(networkService: NetworksService);
    list(): Promise<any>;
    listTokens(): Promise<any>;
    addToken(payload: AddTokenDto, req: any): Promise<any>;
    getTokenInfo(payload: QueryUserTokenData, req: any): Promise<any>;
    getUserToken(payload: QueryUserTokenData, req: any): Promise<any>;
    sendToken(payload: SendTokenData, req: any): Promise<any>;
    calculateTransaction(payload: SendTokenData, req: any): Promise<any>;
    getHistory(payload: QueryHistoryData, req: any): Promise<{
        count: number;
        currentPage: number;
        firstItem: number;
        lastItem: number;
        lastPage: number;
        perPage: number;
        total: number;
        statusCode: number;
        data: {
            imgUrl: string;
            symbol: string;
            createdAt: number;
            data: string;
            _id: any;
            __v?: any;
            id?: any;
            userId: string;
            token: string;
            network: string;
            action: string;
            from_address: string;
            to_address: string;
            amount: string;
            txHash: string;
            network_fee: string;
        }[];
    }>;
}
//# sourceMappingURL=network.controller.d.ts.map