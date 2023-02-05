import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './schemas/contact.schema';
import { PaginationDto } from 'src/common/dto/pagination.dto'

@Injectable()
export class ContactsService {

  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: PaginateModel<Contact>
  ) { }

  async create(createContactDto: CreateContactDto) {
    const dniRegistered = await this.contactModel.findOne({ dni: createContactDto.dni })

    if (Boolean(dniRegistered)) {
      return new BadRequestException('DNI already registered')
    }
    const contact = await this.contactModel.create(createContactDto)
    return contact
  }


  async findAll(companyId: string, queryParams: PaginationDto) {
    const { limit = 30, page = 1 } = queryParams
    const results = await this.contactModel.paginate({
      companyId
    }, {
      limit,
      page
    })
    return results
  }

  async findOne(id: string) {
    const contact = await this.contactModel.findById(id)
    if (!contact) new NotFoundException()
    return contact
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const existContact = await this.contactModel.findById(id)
    if (existContact) {
      return new BadRequestException('Contact no registered')
    }
    const contactUpdated = await this.contactModel.findByIdAndUpdate(id, { ...updateContactDto }, { new: true })
    return contactUpdated
  }

  async remove(id: string) {
    const contactRemoved = await this.contactModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true })
    return contactRemoved
  }
}
