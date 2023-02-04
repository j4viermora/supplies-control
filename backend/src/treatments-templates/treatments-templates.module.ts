import { Module } from '@nestjs/common';
import { TreatmentsTemplatesService } from './treatments-templates.service';
import { TreatmentsTemplatesController } from './treatments-templates.controller';

import { MongooseModule } from '@nestjs/mongoose'
import { TreatmentsTemplate, TreatmentsTemplateSchema } from './schemas/treatments-template.schema'

import * as mongoosePaginate from 'mongoose-paginate-v2'


@Module({
  controllers: [TreatmentsTemplatesController],
  providers: [TreatmentsTemplatesService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TreatmentsTemplate.name,
        useFactory: () => {
          const schema = TreatmentsTemplateSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        }
      }
    ])
  ]
})
export class TreatmentsTemplatesModule { }
