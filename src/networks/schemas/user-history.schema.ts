import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserHistoryDocument = UserHistory & Document;

@Schema({ versionKey: false })
export class UserHistory {
  @Prop()
  userId: string;

  @Prop()
  network: string;

  @Prop()
  action: string; // send, send_token, call_contract

  @Prop()
  from_address: string;

  @Prop()
  to_address: string;

  @Prop()
  token: string;

  @Prop()
  symbol: string;

  @Prop()
  amount: string;

  @Prop()
  data: string;

  @Prop()
  txHash: string;

  @Prop()
  network_fee: string;

  @Prop({ default: Date.now() })
  createdAt: number;
}

export const UserHistorySchema = SchemaFactory.createForClass(UserHistory);
