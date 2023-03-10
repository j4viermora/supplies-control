import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: PaginateModel<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const exist = await this.existEmail(createCompanyDto.email);
    if (exist)
      return new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    const totalCommunities = await this.companyModel.find({}).count();
    const code = this.createCode(totalCommunities);
    const data = await this.companyModel.create({
      code,
      ...createCompanyDto,
    });
    return {
      message: 'Company created successfully',
      data,
    };
  }

  async findAll({ limit = 4, page = 1 }: PaginationDto) {
    return await this.companyModel.paginate({}, { page, limit });
  }

  async findOne(id: Types.ObjectId) {
    const company = await this.companyModel
      .findOne({ _id: id })
      .select('-__v');
    if (!company) return [];
    return company;
  }

  async existEmail(email: string) {
    const company = await this.companyModel
      .findOne({ email })
      .countDocuments();
    if (!company) return false;
    return true;
  }

  async update(id: string, UpdateCompanyDto: UpdateCompanyDto) {
    const result = await this.companyModel.findByIdAndUpdate(
      id,
      UpdateCompanyDto,
      { new: true },
    );
    if (!result)
      return new HttpException('Company not found', HttpStatus.NOT_FOUND);
    return result;
  }

  async remove(id: string) {
    const result = await this.companyModel.findOneAndDelete({ _id: id });
    if (!result)
      return new HttpException('Company not found', HttpStatus.NOT_FOUND);
    return {
      message: 'Company deleted successfully',
    };
  }

  async activate(id: string) {
    const result = await this.companyModel.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true },
    );
    if (!result)
      return new HttpException('Company not found', HttpStatus.NOT_FOUND);
    return result;
  }
  async deactivate(id: string) {
    const result = await this.companyModel.findByIdAndUpdate(
      id,
      { status: 'deactive' },
      { new: true },
    );
    if (!result)
      return new HttpException('Company not found', HttpStatus.NOT_FOUND);
    return result;
  }
  createCode(totalRegisters) {
    const code = totalRegisters + 1;
    const codeString = code.toString();
    const codeLength = codeString.length;
    let codeStringPadded = '';
    for (let i = 0; i < 4 - codeLength; i++) {
      codeStringPadded += '0';
    }
    return codeStringPadded + codeString;
  }
  handleExeption(error: Error) { }
}
