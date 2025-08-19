import { CampaignStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateCampaignStatusDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    id: number

    @IsEnum(CampaignStatus)
    @IsNotEmpty()
    status: CampaignStatus
}