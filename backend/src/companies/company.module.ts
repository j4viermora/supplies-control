import { Module } from '@nestjs/common';
import { CommunitiesService } from './companies.service';
import { CompanyController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [CompanyController],
  providers: [CommunitiesService],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MongooseModule.forFeatureAsync([
      {
        name: Company.name,
        useFactory: () => {
          const schema = CompanySchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
})
export class CompaniesModule { }
