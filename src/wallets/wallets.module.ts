import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletService } from './wallets.service';
import { WalletController } from './wallets.controller';
import { Wallet, WalletSchema } from './schemas/wallet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  // controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletsModule {}
