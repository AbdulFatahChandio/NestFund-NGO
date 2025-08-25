import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "generated/prisma";
import Stripe from "stripe";
import { config } from "process";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DonationService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService

    ) { }
    async createDonation(dto: CreateDonationDto, currentUser: User) {
        try {

            const campaign = await this.prisma.campaign.findUnique({
                where: { id: dto.campaignId },
            });

            if (!campaign) {
                throw new NotFoundException('Campaign does not exist');
            }

            if (campaign.status !== 'active') {
                throw new ForbiddenException('Campaign is not active, donation not allowed');
            }
            const donation = await this.prisma.donation.create({
                data: {
                    amount: dto.amount,
                    currency: dto.currency,
                    donorId: currentUser.id,
                    campaignId: dto.campaignId,
                },
            });
            const stripe_key = this.config.getOrThrow("STRIPE_SECRET_KEY");

            const stripe = new Stripe(stripe_key);

            const paymentIntent = await stripe.paymentIntents.create({
                amount:dto.amount,
                currency: dto.currency,
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            console.log('paymentIntent', paymentIntent)


            // await this.prisma.campaign.update({
            //     where: { id: dto.campaignId },
            //     data: {
            //         collectedAmount: campaign.collectedAmount.plus(dto.amount),
            //     },
            // });

            return paymentIntent;
        } catch (error) {
            console.error('Error creating donation:', error);
            throw new BadRequestException(
                error.message || 'An error occurred while creating donation',
            );
        }
    }
}