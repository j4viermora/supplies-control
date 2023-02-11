import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';
import { IItemTreatment } from 'src/common/interfaces';

class IItemTreatmentParam {
  @IsMongoId()
  readonly id: Types.ObjectId;

  @IsString()
  readonly name: string;

  @IsNumber()
  @IsInt()
  readonly quantity: number;
}

export class CreateTreatmentDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly doctor: string;

  @IsString()
  readonly patient: string;

  @IsISO8601()
  readonly date: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IItemTreatmentParam)
  readonly items: IItemTreatment[];

  @IsOptional()
  @IsEnum(STATUS_DOCUMENT)
  readonly status: STATUS_DOCUMENT;
}
