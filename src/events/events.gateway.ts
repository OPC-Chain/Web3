import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConnectionService } from 'src/connection/connection.service';
import { CurrentAccountDto } from './dto/events.dto';
 
@WebSocketGateway({
  allowEIO3: true,
})
export class EventGateway {
  constructor(
    private connectionService: ConnectionService,
  ) { }
  @WebSocketServer()
  server;

  public currentAccount = async (userId: string, url: string): Promise<any> => {
    const isConnected = await this.connectionService.getConnection(userId, url)
    if (isConnected.data){
      return isConnected;
    }
    if (!isConnected.data){
      return await this.connectionService.createConnect(userId, url)
    }
  }

  async handleDisconnect(userId: string, url: string): Promise<any> {
    return await this.connectionService.disconnect(userId, url)
  }

  public handleConnect = async( userId: string, url: string) => {
    return await this.currentAccount(userId, url)
  }

}