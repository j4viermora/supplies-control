import { PartialType } from '@nestjs/swagger';
import { CreateTreatmentsTemplateDto } from './create-treatments-template.dto';

export class UpdateTreatmentsTemplateDto extends PartialType(CreateTreatmentsTemplateDto) {}
