import { Status } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class updateNgoStatusDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsEnum(Status)
    @IsOptional()
    ngoStatus: Status
}