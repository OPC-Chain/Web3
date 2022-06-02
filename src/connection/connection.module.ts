import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionSchema } from './schemas/connection.schema';
import { WalletsModule } from 'src/wallets/wallets.module';
import { NetworksModule } from 'src/networks/networks.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Connection.name, schema: ConnectionSchema },
    ]),
    WalletsModule,
    NetworksModule,
  ],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
