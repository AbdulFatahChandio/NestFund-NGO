import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, IsEnum } from "class-validator";
import { CampaignStatus } from "@prisma/client";

export class CreateCampaignDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    goalAmount: number;

    @IsNumber()
    @IsNotEmpty()
    collectedAmount: number;

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    endDate: Date;

    @IsEnum(CampaignStatus)
    @IsNotEmpty()
    status: CampaignStatus;

    @IsString()
    @IsNotEmpty()
    email: string
}
