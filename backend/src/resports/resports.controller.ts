import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResportsService } from './resports.service';
import { CreateResportDto } from './dto/create-resport.dto';
import { UpdateResportDto } from './dto/update-resport.dto';

@Controller('resports')
export class ResportsController {
  constructor(private readonly resportsService: ResportsService) {}

  @Post()
  create(@Body() createResportDto: CreateResportDto) {
    return this.resportsService.create(createResportDto);
  }

  @Get()
  findAll() {
    return this.resportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResportDto: UpdateResportDto) {
    return this.resportsService.update(+id, updateResportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resportsService.remove(+id);
  }
}
