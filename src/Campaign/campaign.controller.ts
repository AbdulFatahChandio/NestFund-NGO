import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CampaignService } from "./campaign.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { GetSingleNGODto } from "./dto/get-single-ngo.dto";

@Controller('campaigns')
export class CampaignController {
    constructor(private campaignService: CampaignService) { }


    @Post('/create')
    async createCampaign(@Body() dto: CreateCampaignDto) {
        return this.campaignService.createCampaign(dto);
    }

    @Get('/get-All-campaigns')
    async getAllCampaigns() {
        return this.campaignService.getAllCampaigns();
    }
    
    @Get(':id')
    async getCampaignById(@Param() dto: GetSingleNGODto) {
        return this.campaignService.getCampaignById(dto);
    }


}