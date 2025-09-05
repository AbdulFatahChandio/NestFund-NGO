import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/Guard/permission-guard';
import { Permissions } from 'src/auth/decorater/can-permission.decorater';
import { GetUser } from 'src/auth/decorater/get-user.decorater';
import * as client from "@prisma/client";

@Controller('donation')
export class DonationController {
    constructor(private readonly donationService: DonationService) { }


    @UseGuards(AuthGuard("jwt"), PermissionsGuard)
    @Permissions("create-donation")
    @Post('/create')
    async createDonation(
        @Body() dto: CreateDonationDto,
        @GetUser() currentUser: client.User) {
        return this.donationService.createDonation(dto, currentUser);
    }


}
