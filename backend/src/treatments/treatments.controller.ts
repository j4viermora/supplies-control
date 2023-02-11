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
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  @Auth(ValidRoles.ADMIN)
  create(
    @GetUser(['company']) userData: { company: string },
    @Body() createTreatmentDto: CreateTreatmentDto,
  ) {
    return this.treatmentsService.create(userData.company, createTreatmentDto);
  }

  @Get('/company')
  @Auth(ValidRoles.ADMIN)
  findAll(
    @GetUser(['company']) userData: { company: string },
    @Query() queryParams: PaginationDto,
  ) {
    return this.treatmentsService.findAll(userData.company, queryParams);
  }

  @Get(':id')
  @Auth(ValidRoles.ADMIN)
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.treatmentsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentsService.update(id, updateTreatmentDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.treatmentsService.remove(id);
  }
}
