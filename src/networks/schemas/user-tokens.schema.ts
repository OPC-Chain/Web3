import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserTokenDocument = UserToken & Document;

@Schema({ versionKey: false })
export class UserToken {
  @Prop()
  userId: string;

  @Prop()
  network: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  type: string;

  @Prop()
  decimals: number;

  @Prop()
  symbol: string;

  @Prop()
  price: string;

  @Prop({ default: Date.now() })
  createdAt: number;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
