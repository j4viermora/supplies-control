import { Module } from '@nestjs/common';
import { DocumentGeneratorService } from './document-generator.service';
import { DocumentGeneratorController } from './document-generator.controller';

@Module({
  controllers: [DocumentGeneratorController],
  providers: [DocumentGeneratorService]
})
export class DocumentGeneratorModule {}
