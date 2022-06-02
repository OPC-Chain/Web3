import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigureDocument = Configure & Document;

@Schema({ versionKey: false })
export class Configure {
  @Prop({ unique: true })
  key: string;

  @Prop()
  value: string;
}

export const ConfigureSchema = SchemaFactory.createForClass(Configure);
