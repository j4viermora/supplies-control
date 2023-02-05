import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Contact extends Document {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    lastName: string

    @Prop({ type: String, required: true })
    dni: string

    @Prop({ type: Types.ObjectId, required: true })
    companyId: string

    @Prop({ type: String })
    shortAddress: string

    @Prop({ type: String, default: 'active' })
    status: string
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
