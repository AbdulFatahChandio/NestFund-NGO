import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { NGO_type, Purpose } from "generated/prisma";

export class NGORegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(NGO_type)
    @IsNotEmpty()
    type: NGO_type

    @IsEnum(Purpose)
    @IsNotEmpty()
    purpose: Purpose

    @IsString()
    @IsNotEmpty()
    registration_ID: string

    @IsString()
    @IsNotEmpty()
    registered_Country: string

    @IsString()
    @IsNotEmpty()
    state: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    no_Of_Staff: number

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    no_Of_beneficiaries: number






}