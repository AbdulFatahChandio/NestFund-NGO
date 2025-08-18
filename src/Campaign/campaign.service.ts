import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { GetSingleNGODto } from "./dto/get-single-ngo.dto";

@Injectable()
export class CampaignService {
    constructor(
        private prisma: PrismaService,

    ) { }

    async createCampaign(dto: CreateCampaignDto) {
        try {
            const existingNGO = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
                include: {
                    ngoProfile: true,
                },
            });

            if (!existingNGO) {
                throw new ForbiddenException('NGO does not exist');
            }

            if (existingNGO.ngoProfile?.ngoStatus !== "approved") {
                throw new ForbiddenException("NGO is not approved");
            }

            const campaign = await this.prisma.campaign.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    goalAmount: dto.goalAmount,
                    collectedAmount: dto.collectedAmount,
                    startDate: dto.startDate,
                    endDate: dto.endDate,
                    status: dto.status,
                    ngoId: existingNGO.ngoProfile.id,
                },
            });
            return campaign;

        } catch (error) {
            console.error('Error creating NGO:', error);
            throw new BadRequestException(error.message || 'An error occurred while creating NGO');
        }
    }

    async getAllCampaigns() {
        try {
            const campaigns = await this.prisma.campaign.findMany({
                include: {
                    ngoProfile: {
                        select: {
                            id: true,
                            type: true,
                            purpose: true,
                            registeredCountry: true,
                            state: true,
                            city: true,
                            ngoStatus: true,
                        },
                    },
                },
            });


            return campaigns
        } catch (error) {
            throw new BadRequestException(error.message || 'An error occurred while fetching campaigns');
        }
    }

    async getCampaignById(dto : GetSingleNGODto) {
        try {
            const campaign = await this.prisma.campaign.findUnique({
                where: { 
                    id:dto.id
                },
                include: {
                    ngoProfile: {
                        select: {
                            id: true,
                            type: true,
                            purpose: true,
                            registeredCountry: true,
                            state: true,
                            city: true,
                            ngoStatus: true,
                        },
                    },
                },
            });
            console.log('campaign', campaign)

            if (!campaign) {
                throw new NotFoundException(`Campaign with ID ${dto.id} not found`);
            }

            return {
                campaign
            };
        } catch (error) {
            
            throw new BadRequestException(error.message || 'An error occurred while fetching campaign');
        }
    }

}