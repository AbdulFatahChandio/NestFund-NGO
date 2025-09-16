import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleService {
    constructor(
        private prisma: PrismaService
    ) {}

    async createRole(createRoleDto: CreateRoleDto) {
        try {
            const role = await this.prisma.role.create({
                data:{
                    name:createRoleDto.name
                }
            })
            return{
                message: 'Role created successfully',
                status: 'success',

                data: {
                    name : role?.name
                }
            }

        } catch (error) {
            if (error) {
                throw new BadRequestException('Role already exists');
            }
            throw new InternalServerErrorException('Role creation failed');
        }

    }
}