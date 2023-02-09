import { IsEnum, IsInt, IsMongoId, IsOptional, IsString, MinLength } from "class-validator";
import { STATUS_DOCUMENT } from "src/common/enums/common.enums";


export class CreateItemDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    description: string;

    @IsInt()
    quantity: number;

    @IsString()
    @MinLength(3)
    brand: string;

    @IsString()
    @IsEnum(STATUS_DOCUMENT)
    @IsOptional()
    status: STATUS_DOCUMENT;

    @IsString()
    @IsOptional()
    code: string
}
