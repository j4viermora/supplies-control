import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateContactDto {

    @IsMongoId()
    readonly companyId: string

    @IsString()
    readonly name: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly dni: string;

    @IsString()
    @IsOptional()
    readonly shortAddress?: string
}
