import { Request, UseGuards } from '@nestjs/common';
import {
  RpcId,
  RpcPayload,
  RpcVersion,
  RpcMethod,
  IRpcHandler,
  RpcHandler,
  RpcMethodHandler,
} from '@jashkasoft/nestjs-json-rpc';
import { AuthService } from '../auth/auth.service';
import { ConnectionService } from 'src/connection/connection.service'
import { CreateConnectionDto } from 'src/connection/dto/connection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@RpcHandler({
  method: 'connection',
})
export class ConnectionHandler {
  constructor(
    private readonly connectionService: ConnectionService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('connect')
  public async connect(
    @RpcPayload() payload: CreateConnectionDto,
    @Request() req,
  ) {
    if (!payload.baseUrl) {
      return {
        statusCode: 400,
        message: 'connection.require_url',
      };
    }
    return await this.connectionService.createConnect(req.user.userId, payload.baseUrl);
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('disconnect')
  public async disconnect(
    @RpcPayload() payload: CreateConnectionDto,
    @Request() req,
  ) {
    if (!payload.baseUrl) {
      return {
        statusCode: 400,
        message: 'connection.require_url',
      };
    }
    return await this.connectionService.disconnect(req.user.userId, payload.baseUrl);
  }

  @UseGuards(JwtAuthGuard)
  @RpcMethodHandler('get-connection')
  public async getConnection(
    @RpcPayload() payload: CreateConnectionDto,
    @Request() req,
  ) {
    if (!payload.baseUrl) {
      return {
        statusCode: 400,
        message: 'connection.require_url',
      };
    }
    return await this.connectionService.getConnection(req.user.userId, payload.baseUrl);
  }
}
