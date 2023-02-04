import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';

@Schema({ timestamps: true })
export class Item extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    quantity: number;

    @Prop()
    brand: string;

    @Prop({ type: Types.ObjectId, required: true, index: true, ref: 'Company' })
    companyId: Types.ObjectId;

    @Prop({ default: STATUS_DOCUMENT.ACTIVE, enum: STATUS_DOCUMENT })
    status: STATUS_DOCUMENT;

    @Prop({ type: String })
    code: string;
    //TODO add createdBy and updatedBy
}

export const ItemSchema = SchemaFactory.createForClass(Item);