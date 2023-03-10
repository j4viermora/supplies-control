import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Auth(ValidRoles.ADMIN)
  create(
    @Body() createItemDto: CreateItemDto,
    @GetUser(['company']) companyId: { company: string },
  ) {
    return this.itemsService.create(companyId.company, createItemDto);
  }

  @Get('company')
  @Auth(ValidRoles.ADMIN)
  findAll(@GetUser(['company']) companyId: { company: string }) {
    return this.itemsService.findAll(companyId.company);
  }

  @Get(':id')
  @Auth(ValidRoles.ADMIN)
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Auth(ValidRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.itemsService.remove(id);
  }
}
