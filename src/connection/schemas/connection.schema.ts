import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConnectionDocument = Connection & Document;

@Schema({ versionKey: false })
export class Connection {
  @Prop()
  userId: string;

  @Prop()
  baseUrl: string;

  @Prop({default: Date.now()})
  createdAt: number;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);