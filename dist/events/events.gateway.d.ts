import { ConnectionService } from 'src/connection/connection.service';
export declare class EventGateway {
    private connectionService;
    constructor(connectionService: ConnectionService);
    server: any;
    currentAccount: (userId: string, url: string) => Promise<any>;
    handleDisconnect(userId: string, url: string): Promise<any>;
    handleConnect: (userId: string, url: string) => Promise<any>;
}
//# sourceMappingURL=events.gateway.d.ts.map