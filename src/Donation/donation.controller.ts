import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/Guard/permission-guard';
import { Permissions } from 'src/auth/decorater/can-permission.decorater';
import { GetUser } from 'src/auth/decorater/get-user.decorater';
import * as client from "@prisma/client";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags("Donation") 
@Controller('donation')
export class DonationController {
    constructor(private readonly donationService: DonationService) { }

    @UseGuards(AuthGuard("jwt"), PermissionsGuard)
    @Permissions("create-donation")
    @Post('/create')
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create a donation" })
    @ApiBody({ type: CreateDonationDto })
    @ApiResponse({ status: 201, description: "Donation created successfully" })
    async createDonation(
        @Body() dto: CreateDonationDto,
        @GetUser() currentUser: client.User
    ) {
        return this.donationService.createDonation(dto, currentUser);
    }
}
