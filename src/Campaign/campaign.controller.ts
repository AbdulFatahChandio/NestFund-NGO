import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CampaignService } from "./campaign.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { GetSingleNGODto } from "./dto/get-single-ngo.dto";
import { UpdateCampaignStatusDto } from "./dto/update-campaign.dto";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/Guard/permission-guard";
import { Permissions } from "src/auth/decorater/can-permission.decorater";

@Controller('campaign')
export class CampaignController {
    constructor(private campaignService: CampaignService) { }

    @Post('/create')
    @UseGuards(AuthGuard("jwt"), PermissionsGuard)
    @Permissions("campaign-create")
    async createCampaign(@Body() dto: CreateCampaignDto) {
        return this.campaignService.createCampaign(dto);
    }

    @UseGuards(AuthGuard("jwt"), PermissionsGuard)
    @Permissions("campaign-read")
    @Get('/get-All-campaigns')
    async getAllCampaigns() {
        return this.campaignService.getAllCampaigns();
    }

    @UseGuards(AuthGuard("jwt"), PermissionsGuard)
    @Permissions("campaign-read")
    @Get(':id')
    async getCampaignById(@Param() dto: GetSingleNGODto) {
        return this.campaignService.getCampaignById(dto);
    }

    @UseGuards(AuthGuard("jwt"), PermissionsGuard)
    @Permissions("campaign-update")
    @Patch('update-status')
    async updateCampaignStatus(@Body() dto: UpdateCampaignStatusDto) {
        return this.campaignService.updateCampaignStatus(dto)
    }


}