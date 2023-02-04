import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { STATUS_DOCUMENT } from "src/common/enums/common.enums";
import { IItemTreatment } from "src/common/interfaces";



@Schema({ timestamps: true })
export class Treatment extends Document {

    @Prop({ required: true, ref: 'Company' })
    readonly companyId: Types.ObjectId;

    @Prop({ required: true, type: String })
    readonly name: string

    @Prop({ required: false })
    readonly description: string;

    @Prop({
        required: true,
        type: [
            {
                name: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
                id: {
                    type: Types.ObjectId,
                }
            }
        ]
    })
    readonly items: IItemTreatment[]

    @Prop({ default: STATUS_DOCUMENT.ACTIVE, enum: STATUS_DOCUMENT })
    readonly status: STATUS_DOCUMENT;

}



export const TreatmentsSchema = SchemaFactory.createForClass(Treatment);