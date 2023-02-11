import { Injectable } from '@nestjs/common';
import { CreateDocumentGeneratorDto } from './dto/create-document-generator.dto';
import { UpdateDocumentGeneratorDto } from './dto/update-document-generator.dto';

@Injectable()
export class DocumentGeneratorService {
  create(createDocumentGeneratorDto: CreateDocumentGeneratorDto) {
    return 'This action adds a new documentGenerator';
  }

  findAll() {
    return `This action returns all documentGenerator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentGenerator`;
  }

  update(id: number, updateDocumentGeneratorDto: UpdateDocumentGeneratorDto) {
    return `This action updates a #${id} documentGenerator`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentGenerator`;
  }
}
