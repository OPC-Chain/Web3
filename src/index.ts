import { EventGateway } from './events/events.gateway';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WalletsModule } from './wallets/wallets.module';
import { NetworksModule } from './networks/networks.module';
import { ConnectionModule } from './connection/connection.module';
import { EventsModule } from './events/events.module';

export {
  EventGateway,
  EventsModule,
  ConnectionModule,
  NetworksModule,
  UsersModule,
  AuthModule,
  WalletsModule,
};
