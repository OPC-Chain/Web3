/// <reference types="mongoose" />
import { ConnectionService } from 'src/connection/connection.service';
import { CreateConnectionDto } from 'src/connection/dto/connection.dto';
export declare class ConnectionHandler {
    private readonly connectionService;
    constructor(connectionService: ConnectionService);
    connect(payload: CreateConnectionDto, req: any): Promise<any>;
    disconnect(payload: CreateConnectionDto, req: any): Promise<(import("../connection/schemas/connection.schema").Connection & import("mongoose").Document<any, any, any> & {
        _id: any;
    }) | {
        statusCode: number;
        message: string;
    }>;
    getConnection(payload: CreateConnectionDto, req: any): Promise<any>;
}
//# sourceMappingURL=connection.controller.d.ts.map