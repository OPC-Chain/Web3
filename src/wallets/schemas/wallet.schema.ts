import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ versionKey: false })
export class Wallet {
  @Prop()
  address: string;

  @Prop()
  name: string;

  @Prop()
  privateKey: string;

  @Prop()
  publicKey: string;

  @Prop()
  passPhase: string;

  @Prop()
  userId: string;

  @Prop()
  createdAt: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
