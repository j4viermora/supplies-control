import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentGeneratorService } from './document-generator.service';
import { CreateDocumentGeneratorDto } from './dto/create-document-generator.dto';
import { UpdateDocumentGeneratorDto } from './dto/update-document-generator.dto';

@Controller('document-generator')
export class DocumentGeneratorController {
  constructor(private readonly documentGeneratorService: DocumentGeneratorService) {}

  @Post()
  create(@Body() createDocumentGeneratorDto: CreateDocumentGeneratorDto) {
    return this.documentGeneratorService.create(createDocumentGeneratorDto);
  }

  @Get()
  findAll() {
    return this.documentGeneratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentGeneratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentGeneratorDto: UpdateDocumentGeneratorDto) {
    return this.documentGeneratorService.update(+id, updateDocumentGeneratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentGeneratorService.remove(+id);
  }
}
