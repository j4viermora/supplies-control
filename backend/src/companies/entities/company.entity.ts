import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: String, required: true })
  code: string;
  //TODO add createdBy and updatedBy
}

export const CompanySchema = SchemaFactory.createForClass(Company);
