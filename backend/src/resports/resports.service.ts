import { Injectable } from '@nestjs/common';
import { CreateResportDto } from './dto/create-resport.dto';
import { UpdateResportDto } from './dto/update-resport.dto';

@Injectable()
export class ResportsService {
  create(createResportDto: CreateResportDto) {
    return 'This action adds a new resport';
  }

  findAll() {
    return `This action returns all resports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resport`;
  }

  update(id: number, updateResportDto: UpdateResportDto) {
    return `This action updates a #${id} resport`;
  }

  remove(id: number) {
    return `This action removes a #${id} resport`;
  }
}
