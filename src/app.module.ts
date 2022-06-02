import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JsonRpcModule } from '@jashkasoft/nestjs-json-rpc';
import { UserHandler } from './rpc/user.controller';
import { WalletHandler } from './rpc/wallet.controller';
import { NetworkHandler } from './rpc/network.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WalletsModule } from './wallets/wallets.module';
import { NetworksModule } from './networks/networks.module';
import { ConnectionModule } from './connection/connection.module';
import { ConnectionHandler } from './rpc/connection.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: [],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo_uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    JsonRpcModule.forRoot({
      path: '/json-rpc', // path to RPC
    }),
    UsersModule,
    AuthModule,
    WalletsModule,
    NetworksModule,
    ConnectionModule,
    EventsModule,
  ],
  controllers: [],
  providers: [UserHandler, WalletHandler, NetworkHandler, ConnectionHandler],
})
export class AppModule {}
