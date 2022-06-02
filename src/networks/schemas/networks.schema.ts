import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NetworkDocument = Network & Document;

@Schema({ versionKey: false })
export class Network {
  @Prop({ unique: true })
  key: string;

  @Prop()
  name: string;

  @Prop()
  rpcUrl: string;

  @Prop()
  chainId: string;

  @Prop()
  symbol: string;

  @Prop()
  explorer: string;

  @Prop({ default: Date.now() })
  createdAt: number;
}

export const NetworkSchema = SchemaFactory.createForClass(Network);
