import { Module } from '@nestjs/common';
import { ResportsService } from './resports.service';
import { ResportsController } from './resports.controller';

@Module({
  controllers: [ResportsController],
  providers: [ResportsService]
})
export class ResportsModule {}
