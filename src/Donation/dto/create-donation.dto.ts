import { IsDecimal, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { DonationStatus } from "@prisma/client";

export class CreateDonationDto {
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Amount must be a number with up to 2 decimals" })
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    currency: string

    @IsInt()
    @IsNotEmpty()
    campaignId: number;

}