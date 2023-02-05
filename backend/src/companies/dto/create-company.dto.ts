import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StatusCompany } from '../enums/communities.enums';

export class CreateCompanyDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsEmail()
  owner: string;

  @IsString()
  @IsOptional()
  @IsEnum(StatusCompany)
  active: StatusCompany;
}
