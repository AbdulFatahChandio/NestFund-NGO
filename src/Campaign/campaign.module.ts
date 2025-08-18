import { Module } from "@nestjs/common";
import { CampaignController } from "./campaign.controller";
import { CampaignService } from "./campaign.service";

@Module({
    providers:[CampaignService],
    controllers:[CampaignController]
})

export class CampaignModule{}