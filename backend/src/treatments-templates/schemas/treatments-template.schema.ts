import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { STATUS_DOCUMENT } from "src/common/enums/common.enums";
import { IItemTreatment } from "src/common/interfaces";




@Schema({ timestamps: true })
export class TreatmentsTemplate extends Document {

    @Prop({ required: true, ref: 'Company' })
    readonly companyId: Types.ObjectId;

    @Prop({ required: true, type: String })
    readonly name: string

    @Prop({ required: false })
    readonly description: string;

    @Prop({
        required: true, type: [
            {
                name: { type: String, required: true },
            },
            {
                id: { type: Types.ObjectId, required: true, ref: 'Item' },
            }
        ]
    })
    readonly items: IItemTreatment[]

    @Prop({ default: STATUS_DOCUMENT.ACTIVE, enum: STATUS_DOCUMENT })
    readonly status: STATUS_DOCUMENT;

}



export const TreatmentsTemplateSchema = SchemaFactory.createForClass(TreatmentsTemplate);