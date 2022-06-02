import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({ versionKey: false })
export class Token {
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

  @Prop()
  imgUrl: string;

  @Prop()
  balance: string;

  @Prop({ default: Date.now() })
  createdAt: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
