import { PartialType } from '@nestjs/swagger';
import { CreateDocumentGeneratorDto } from './create-document-generator.dto';

export class UpdateDocumentGeneratorDto extends PartialType(CreateDocumentGeneratorDto) {}
