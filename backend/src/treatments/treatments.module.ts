import { Module } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { TreatmentsController } from './treatments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Treatment, TreatmentsSchema } from './schemas/treatment.schema';

import * as mongoosePaginate from 'mongoose-paginate-v2';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeatureAsync([
      {
        name: Treatment.name,
        useFactory: () => {
          const schema = TreatmentsSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
})
export class TreatmentsModule {}
