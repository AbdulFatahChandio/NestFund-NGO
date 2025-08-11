import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { NGORegisterDto } from "./dto/ngo-registration.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Purpose } from "generated/prisma";

@Injectable()
export class NGOService {
    constructor(
        private prisma: PrismaService
    ) { }
    async registerNGO(dto: NGORegisterDto) {
        const existingNGO = await this.prisma.ngoProfile.findFirst({
            where: {
                name: dto.name,
            }
        })
        console.log('existing', existingNGO)
        if (existingNGO?.name === dto.name) {
            throw new BadRequestException('NGO already registered with these details');
        }
        try {

            const NGO = await this.prisma.ngoProfile.create({
                data: {
                    name: dto.name,
                    type: dto.type,
                    purpose: dto.purpose,
                    registration_ID: dto.registration_ID,
                    registered_Country: dto.registered_Country,
                    state: dto.state,
                    city: dto.city,
                    no_Of_Staff: dto.no_Of_Staff,
                    no_Of_beneficiaries: dto.no_Of_beneficiaries
                }
            })
            return {
                message: 'NGO created successfully',
                status: 'success',

                data:
                    NGO
            }

        } catch (error) {
            // if (error) {
            //     throw new BadRequestException(error);
            // }
            throw new BadRequestException('NGO creation failed');
        }
    }
}
