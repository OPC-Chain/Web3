import { Model } from 'mongoose';
import { NetworkDocument } from './schemas/networks.schema';
import { TokenDocument } from './schemas/tokens.schema';
import { UserTokenDocument } from './schemas/user-tokens.schema';
import { WalletDocument } from 'src/wallets/schemas/wallet.schema';
import { UserHistoryDocument } from './schemas/user-history.schema';
import { NetworkList, TokenList, UserTokenData, GetTokenData, SendTokenResponse, GasInfoResponse } from './dto/get_networks.dto';
import { AddTokenDto, QueryUserTokenData } from './dto/user-token.dto';
import * as Promise from 'bluebird';
import { CommonService } from 'src/common/common.service';
export declare class NetworksService {
    private networkModel;
    private tokenModel;
    private userTokenModel;
    private usrHisModel;
    private walletModel;
    private commonService;
    constructor(networkModel: Model<NetworkDocument>, tokenModel: Model<TokenDocument>, userTokenModel: Model<UserTokenDocument>, usrHisModel: Model<UserHistoryDocument>, walletModel: Model<WalletDocument>, commonService: CommonService);
    TOKEN_ABI: ({
        type: string;
        stateMutability: string;
        payable: boolean;
        inputs: any[];
        name?: undefined;
        anonymous?: undefined;
        outputs?: undefined;
        constant?: undefined;
    } | {
        type: string;
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
            indexed: boolean;
        }[];
        anonymous: boolean;
        stateMutability?: undefined;
        payable?: undefined;
        outputs?: undefined;
        constant?: undefined;
    } | {
        type: string;
        stateMutability: string;
        payable: boolean;
        outputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        name: string;
        inputs: {
            type: string;
            name: string;
            internalType: string;
        }[];
        constant: boolean;
        anonymous?: undefined;
    })[];
    tokenType: {
        opc_mainnet: string;
        bsc_mainnet: string;
        eth_mainnet: string;
    };
    onModuleInit(): Promise<void>;
    list(): Promise<NetworkList>;
    listToken(): Promise<TokenList>;
    addToken(tokenInput: AddTokenDto, userId: string): Promise<UserTokenData>;
    getTokenInfo(requestToken: QueryUserTokenData): Promise<GetTokenData>;
    listUserToken(network: string, address: string, userId: string): Promise<TokenList>;
    calculateTransaction(network: string, from: string, to: string, userId: string, amount: string, token: string): Promise<GasInfoResponse>;
    sendToken(network: string, from: string, to: string, userId: string, amount: string, token: string, gasPrice: number, gasLimit: number): Promise<SendTokenResponse>;
    getHistory(network: string, from_address: string, userId: string, page: number, limit: number): Promise<{
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
    getPriceTokenOPC(address: string, provider: any): Promise<string | 0 | 1>;
    initData(): Promise<void>;
}
//# sourceMappingURL=networks.service.d.ts.map