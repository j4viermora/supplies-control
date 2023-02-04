import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entities/item.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Item.name,
        useFactory: () => {
          const schema = ItemSchema;
          schema.plugin(mongoosePaginate);

          return schema
        }
      }
    ])
  ]
})
export class ItemsModule { }
