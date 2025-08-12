
import { NGO_type, Purpose } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, Min, MinLength } from "class-validator";

export class RegisterNgoDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    name: string

    @IsInt()
    @IsNotEmpty()
    roleId: number

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

    @IsInt()
    @IsNotEmpty()
    creatorId: number
}