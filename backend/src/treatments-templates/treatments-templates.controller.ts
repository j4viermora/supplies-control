import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TreatmentsTemplatesService } from './treatments-templates.service';
import { CreateTreatmentsTemplateDto } from './dto/create-treatments-template.dto';
import { UpdateTreatmentsTemplateDto } from './dto/update-treatments-template.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller('treatments-templates')
export class TreatmentsTemplatesController {
  constructor(private readonly treatmentsTemplatesService: TreatmentsTemplatesService) { }

  @Post()
  create(@Body() createTreatmentsTemplateDto: CreateTreatmentsTemplateDto) {
    return this.treatmentsTemplatesService.create(createTreatmentsTemplateDto);
  }

  @Get('/company/:companyId')
  findAll(
    @Param('companyId', ParseMongoIdPipe) companyId: string,
    @Query() queryParams: PaginationDto,
  ) {
    return this.treatmentsTemplatesService.findAll(companyId, queryParams);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.treatmentsTemplatesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateTreatmentsTemplateDto: UpdateTreatmentsTemplateDto) {
    return this.treatmentsTemplatesService.update(id, updateTreatmentsTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.treatmentsTemplatesService.remove(id);
  }
}
