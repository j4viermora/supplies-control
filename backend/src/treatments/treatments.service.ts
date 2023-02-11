import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Treatment } from './schemas/treatment.schema';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectModel(Treatment.name)
    private readonly treatmentModel: PaginateModel<Treatment>,
  ) {}

  async create(companyId: string, createTreatmentDto: CreateTreatmentDto) {
    const createdTreatment = await this.treatmentModel.create({
      ...createTreatmentDto,
      companyId,
    });
    return createdTreatment;
  }

  async findAll(companyId: string, queryParams: PaginationDto) {
    const { page, limit } = queryParams;
    const resp = await this.treatmentModel.paginate(
      { companyId },
      { page, limit },
    );
    if (!resp) new NotFoundException('Treatment not found');
    return resp;
  }

  async findOne(id: string) {
    const resp = this.treatmentModel.findById(id);
    if (!resp) new NotFoundException('Treatment not found');
    return resp;
  }

  async update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    const treatmetnUpdated = await this.treatmentModel.findByIdAndUpdate(
      id,
      updateTreatmentDto,
      { new: true },
    );
    return treatmetnUpdated;
  }

  async remove(id: string) {
    const resp = await this.treatmentModel.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true },
    );
    if (!resp) new NotFoundException('Treatment not found');
    return resp;
  }
}
