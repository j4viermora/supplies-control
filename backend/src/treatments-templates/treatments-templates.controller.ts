import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TreatmentsTemplatesService } from './treatments-templates.service';
import { CreateTreatmentsTemplateDto } from './dto/create-treatments-template.dto';
import { UpdateTreatmentsTemplateDto } from './dto/update-treatments-template.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('treatments-templates')
export class TreatmentsTemplatesController {
  constructor(
    private readonly treatmentsTemplatesService: TreatmentsTemplatesService,
  ) {}

  @Post()
  create(@Body() createTreatmentsTemplateDto: CreateTreatmentsTemplateDto) {
    return this.treatmentsTemplatesService.create(createTreatmentsTemplateDto);
  }

  @Get('/company')
  @Auth(ValidRoles.ADMIN)
  findAll(
    @GetUser(['company']) userData: { company: string },
    @Query() queryParams: PaginationDto,
  ) {
    return this.treatmentsTemplatesService.findAll(
      userData.company,
      queryParams,
    );
  }

  @Get(':id')
  @Auth(ValidRoles.ADMIN)
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.treatmentsTemplatesService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateTreatmentsTemplateDto: UpdateTreatmentsTemplateDto,
  ) {
    return this.treatmentsTemplatesService.update(
      id,
      updateTreatmentsTemplateDto,
    );
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.treatmentsTemplatesService.remove(id);
  }
}
