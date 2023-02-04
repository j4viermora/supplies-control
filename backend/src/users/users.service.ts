import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Roles, UserStatus } from './enums/users.enums';
import { UsersQueryOptionsDto } from './dto/query-options.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: PaginateModel<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const emailAndDniExist = await this.userModel.findOne({
      email: createUserDto.email
    });
    if (emailAndDniExist)
      throw new BadRequestException(
        `Email: ${createUserDto.email} already register`,
      );

    const hash = await bcrypt.hash(createUserDto.password, this.saltRounds);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hash,
    });


    return {
      message: 'User created sucessfully'
    }
  }

  findAll() {
    return `This action returns all users`;
  }
  async findAllByCompanyId(
    id: string,
    queryOptionsDto: UsersQueryOptionsDto,
  ) {
    const {
      limit = 10,
      page = 1,
      name,
      dni,
      includeLocation = false,
    } = queryOptionsDto;

    return await this.userModel.paginate(
      {
        community: id,
        ...(dni ? { dni } : {}),
        ...(name ? { name: new RegExp(name, 'i') } : {}),
      },
      {
        limit,
        page,
        select: '-__v',
        ...(includeLocation
          ? {
            populate: {
              path: 'location',
              select: 'name _id',
            },
          }
          : {}),
      },
    );
  }

  async findOne(id: string) {
    const result = await this.userModel.findById(id);
    if (!result) return { message: 'User not found', doc: [] };
    return result;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email, status: UserStatus.ACTIVE })
      .select('_id name email password roles');
    return user;
  }

  async byName(communityId: string, name: string) {
    const result = await this.userModel.paginate({
      $and: [{ name: new RegExp(name, 'i') }, { community: communityId }],
    });

    if (!result) throw new NotFoundException('User not found');

    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-__v');
    return result;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return {
      message: 'User removed successfully',
    };
  }

  async activate(id: string) {
    await this.userModel.findByIdAndUpdate(id, { status: UserStatus.ACTIVE });
    return {
      message: 'User activated successfully',
    };
  }

  async disable(id: String) {
    await this.userModel.findByIdAndUpdate(id, { status: UserStatus.DISABLED });
    return {
      message: 'User disable successfully',
    };
  }
  /**
   *
   * @param id User id
   * @returns Session with community, location info
   */
  async self(id: string) {
    const result = await this.userModel
      .findById(id)
      .populate('company');
    const user = {
      _id: result._id,
      name: result.name,
      lastName: result.lastName,
      email: result.email,
      roles: result.roles,
    };
    return {
      user,
      company: result.company,
    };
  }
}
