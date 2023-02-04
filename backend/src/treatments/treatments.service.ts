import { Injectable } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentsService {
  create(createTreatmentDto: CreateTreatmentDto) {
    return 'This action adds a new treatment';
  }

  findAll() {
    return `This action returns all treatments`;
  }

  findOne(id: string) {
    return `This action returns a #${id} treatment`;
  }

  update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    return `This action updates a #${id} treatment`;
  }

  remove(id: string) {
    return `This action removes a #${id} treatment`;
  }
}
