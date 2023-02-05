import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Contact.name,
        useFactory: () => {
          const schema = ContactSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        }
      }
    ])
  ],
})
export class ContactsModule { }
