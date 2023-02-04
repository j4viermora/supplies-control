import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {

  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: PaginateModel<Item>,
  ) { }



  async create(createItemDto: CreateItemDto) {
    const item = await this.itemModel.create(createItemDto)
    return item
  }

  async findAll(companyId: string) {
    const item = await this.itemModel.paginate({
      company: companyId,
    })
    return item
  }

  async findOne(id: string) {
    return await this.itemModel.findOne({
      _id: id,
    })
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true })
  }

  async remove(id: string) {
    const resp = await this.itemModel.findByIdAndRemove(id, { new: true })
    return {
      message: 'Item deleted',
      resp
    }
  }
}
