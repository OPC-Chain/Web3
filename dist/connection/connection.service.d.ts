import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Connection, ConnectionDocument } from './schemas/connection.schema';
import { WalletService } from 'src/wallets/wallets.service';
import { NetworksService } from 'src/networks/networks.service';
export declare class ConnectionService implements OnModuleInit {
    private connectionModel;
    private walletService;
    private networksService;
    constructor(connectionModel: Model<ConnectionDocument>, walletService: WalletService, networksService: NetworksService);
    private providerOpc;
    onModuleInit(): Promise<void>;
    getConnection(userId: string, url: string): Promise<any>;
    createConnect(userId: string, url: string): Promise<any>;
    disconnect(userId: string, url: string): Promise<Connection & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
//# sourceMappingURL=connection.service.d.ts.map