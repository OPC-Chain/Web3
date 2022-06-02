import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop()
  UUID: string;

  @Prop()
  password: string;

  @Prop()
  createdAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);