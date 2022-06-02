import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NetworksService } from './networks.service';
import { Network, NetworkSchema } from './schemas/networks.schema';
import { Token, TokenSchema } from './schemas/tokens.schema';
import { UserToken, UserTokenSchema } from './schemas/user-tokens.schema';
import { UserHistory, UserHistorySchema } from './schemas/user-history.schema';
import { Wallet, WalletSchema } from '../wallets/schemas/wallet.schema';
import { CommonModule } from '../common/common.module';
import { WalletsModule } from '../wallets/wallets.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Network.name, schema: NetworkSchema },
      { name: Token.name, schema: TokenSchema },
      { name: UserToken.name, schema: UserTokenSchema },
      { name: UserHistory.name, schema: UserHistorySchema },
      { name: Wallet.name, schema: WalletSchema },
    ]),
    CommonModule,
    WalletsModule,
  ],
  providers: [NetworksService],
  exports: [NetworksService],
})
export class NetworksModule {}
