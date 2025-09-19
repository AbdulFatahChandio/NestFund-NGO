import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CampaignService } from "./campaign.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { GetSingleNGODto } from "./dto/get-single-ngo.dto";
import { UpdateCampaignStatusDto } from "./dto/update-campaign.dto";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/Guard/permission-guard";
import { Permissions } from "src/auth/decorater/can-permission.decorater";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Campaign") 
@Controller("campaign")
export class CampaignController {
  constructor(private campaignService: CampaignService) {}

  @Post("/create")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Permissions("campaign-create")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new campaign" })
  @ApiBody({ type: CreateCampaignDto })
  @ApiResponse({ status: 201, description: "Campaign created successfully" })
  async createCampaign(@Body() dto: CreateCampaignDto) {
    return this.campaignService.createCampaign(dto);
  }

  @Get("/get-All-campaigns")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Permissions("campaign-read")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all campaigns" })
  @ApiResponse({ status: 200, description: "List of all campaigns" })
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Permissions("campaign-read")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get campaign by ID" })
  @ApiParam({ name: "id", type: String, description: "Campaign ID" })
  @ApiResponse({ status: 200, description: "Campaign details" })
  async getCampaignById(@Param() dto: GetSingleNGODto) {
    return this.campaignService.getCampaignById(dto);
  }

  @Patch("update-status")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Permissions("campaign-update")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update campaign status" })
  @ApiBody({ type: UpdateCampaignStatusDto })
  @ApiResponse({ status: 200, description: "Campaign status updated successfully" })
  async updateCampaignStatus(@Body() dto: UpdateCampaignStatusDto) {
    return this.campaignService.updateCampaignStatus(dto);
  }
}
