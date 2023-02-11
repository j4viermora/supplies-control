import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoSqlModule } from './configurations/database/no-sql/no-sql.module';
import { NoSqlService } from './configurations/database/no-sql/no-sql.service';
import { ApplicationModule } from './configurations/application/application.module';
import { ApplicationService } from './configurations/application/application.service';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/company.module';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { TreatmentsTemplatesModule } from './treatments-templates/treatments-templates.module';
import { ContactsModule } from './contacts/contacts.module';
import { ResportsModule } from './resports/resports.module';
import { MailerModule } from './mailer/mailer.module';
import { DocumentGeneratorModule } from './document-generator/document-generator.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [NoSqlModule],
      useFactory: async (mongodb: NoSqlService) => ({
        uri: mongodb.uri,
      }),
      inject: [NoSqlService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ApplicationModule],
      useFactory: (appConfig: ApplicationService) => ({
        ttl: appConfig.throttleTTL,
        limit: appConfig.throttleLimit,
      }),
      inject: [ApplicationService],
    }),
    UsersModule,
    CompaniesModule,
    AuthModule,
    ItemsModule,
    TreatmentsModule,
    TreatmentsTemplatesModule,
    ContactsModule,
    ResportsModule,
    MailerModule,
    DocumentGeneratorModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
