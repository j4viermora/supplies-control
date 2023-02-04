import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StatusCommunity } from '../enums/communities.enums';

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
  @IsEnum(StatusCommunity)
  active: StatusCommunity;
}
