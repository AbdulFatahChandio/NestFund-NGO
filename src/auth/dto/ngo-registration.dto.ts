import { NgoType, Purpose } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, IsStrongPassword, MaxLength, Min, MinLength } from "class-validator";

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

    @IsEnum(NgoType)
    @IsNotEmpty()
    type: NgoType

    @IsEnum(Purpose)
    @IsNotEmpty()
    purpose: Purpose

    @IsString()
    @IsNotEmpty()
    registrationID: string

    @IsString()
    @IsNotEmpty()
    registeredCountry: string

    @IsString()
    @IsNotEmpty()
    state: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    noOfStaff: number

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    noOfBeneficiaries: number

   
}