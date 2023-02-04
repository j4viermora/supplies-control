import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateTreatmentsTemplateDto } from './dto/create-treatments-template.dto';
import { UpdateTreatmentsTemplateDto } from './dto/update-treatments-template.dto';
import { TreatmentsTemplate } from './schemas/treatments-template.schema';
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class TreatmentsTemplatesService {

  constructor(
    @InjectModel(TreatmentsTemplate.name)
    private readonly treatmentTemplateModel: PaginateModel<TreatmentsTemplate>,
  ) { }


  async create(createTreatmentsTemplateDto: CreateTreatmentsTemplateDto) {
    const resp = await this.treatmentTemplateModel.create(createTreatmentsTemplateDto);
    return resp;
  }

  async findAll(companyId: string, queryParams: PaginationDto) {
    const { limit = 30, page = 1 } = queryParams;

    const resp = await this.treatmentTemplateModel.paginate({ companyId }, { limit, page });

    if (!resp) throw new NotFoundException('No se encontraron registros');
    return resp
  }

  async findOne(id: string) {
    const resp = await this.treatmentTemplateModel.findById(id)
    if (!resp) throw new NotFoundException('No se encontraron registros');
    return resp
  }

  async update(id: string, updateTreatmentsTemplateDto: UpdateTreatmentsTemplateDto) {

    const resp = await this.treatmentTemplateModel.findByIdAndUpdate(id, updateTreatmentsTemplateDto, { new: true })
    if (!resp) throw new NotFoundException('No se encontraron registros');
    return resp

  }

  async remove(id: string) {

    const resp = await this.treatmentTemplateModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true })
    if (!resp) throw new NotFoundException('No se encontraron registros');
    return `This action removes a #${id} treatmentsTemplate`;
  }
}
