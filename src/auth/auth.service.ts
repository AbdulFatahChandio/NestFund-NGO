import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dto/signup-dto";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { SignInDto } from "./dto/signin-dto";
import { JwtService } from "@nestjs/jwt";
import { RegisterNgoDto } from "./dto/ngo-registration.dto";
import { updateNgoStatusDto } from "./dto/ngo-Status-Update.dto";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService,
        public jwt: JwtService

    ) {

    }


    async signup(dto: SignUpDto) {
        try {

            const role = await this.prisma.role.findUnique({
                where: {
                    id: dto.roleId
                },
            })
            if (!role) {
                throw new BadRequestException('Invalid role provided');
            }

            const existingUser = await this.prisma.user.findFirst({
                where: {
                    email: dto.email,
                }
            })
            if (existingUser) {
                throw new ForbiddenException('UserName & Email Already Exist');
            }



            const hashed = await bcrypt.hash(dto.password, 10)

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashed,
                    roleId: dto.roleId,
                    name: dto.name

                }
            })

            return {
                message: 'User created successfully',
                status: 'success',

                data: {
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    roleId: user?.roleId,
                    token: await this.generate_JWT(user.id, user.email)
                },
            }
        } catch (error: any) {
            if (error) {
                throw new ForbiddenException('Email & Username must be unique');
            }
            throw error;
        }

    }

    async signin(dto: SignInDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            }
        })
        if (!existingUser) {
            throw new ForbiddenException('Invalid email or password');
        }

        const matchPassword = await bcrypt.compare(dto.password, existingUser.password)
        if (!matchPassword) {
            throw new ForbiddenException('Invalid email or password');
        }

        return {
            message: 'login successfully',
            status: 'success',
            data: {
                id: existingUser?.id,
                email: existingUser?.email,
                name: existingUser?.name,
                token: await this.generate_JWT(existingUser.id, existingUser.email)
            },
        }
    }

    async registerNGO(dto: RegisterNgoDto) {
        try {
            const role = await this.prisma.role.findUnique({
                where: {
                    id: dto.roleId
                }
            });
            if (!role) {
                throw new BadRequestException('Invalid role provided');
            }

            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if (existingUser) {
                throw new ForbiddenException('Email already exists');
            }
            const existingNGO = await this.prisma.ngoProfile.findUnique({
                where: {
                    registrationID: dto.registrationID
                }
            });
            if (existingNGO) {
                throw new BadRequestException('NGO already registered with this registration ID');
            }

            const hashedPassword = await bcrypt.hash(dto.password, 10);

            const result = await this.prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        email: dto.email,
                        password: hashedPassword,
                        name: dto.name,
                        roleId: dto.roleId
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: { select: { name: true } }
                    }
                });

                const ngo = await tx.ngoProfile.create({
                    data: {
                        type: dto.type,
                        purpose: dto.purpose,
                        registrationID: dto.registrationID,
                        registeredCountry: dto.registeredCountry,
                        state: dto.state,
                        city: dto.city,
                        noOfStaff: dto.noOfStaff,
                        noOfBeneficiaries: dto.noOfBeneficiaries,
                        creatorId: user.id,
                    },
                    select: {
                        type: true,
                        purpose: true,
                        registrationID: true,
                        registeredCountry: true,
                        state: true,
                        city: true,
                        noOfStaff: true,
                        noOfBeneficiaries: true,
                        ngoStatus: true
                    }
                });

                return { ...user, ngoProfile: ngo };
            });

            return {
                message: 'NGO created successfully',
                status: 'success',
                data: result,
                token: await this.generate_JWT(result.id, result.email)
            };

        } catch (error) {
            console.error('Error creating NGO:', error);
            throw new BadRequestException(error.message || 'An error occurred while creating NGO');
        }
    }

    async getAllNGO() {
        try {
            const ngos = await this.prisma.user.findMany({
                where: {
                    ngoProfile: {
                        isNot: null
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: {
                        select: { name: true }
                    },
                    ngoProfile: {
                        select: {
                            type: true,
                            purpose: true,
                            registrationID: true,
                            registeredCountry: true,
                            state: true,
                            city: true,
                            noOfStaff: true,
                            noOfBeneficiaries: true
                        }
                    }
                }
            });

            return {
                message: 'NGOs fetched successfully',
                status: 'success',
                data: ngos
            };

        } catch (error) {
            console.error('Error fetching NGOs:', error);
            throw new BadRequestException(error.message || 'An error occurred while fetching NGOs');
        }
    }

    async updateNgoStatus(dto: updateNgoStatusDto) {
        const existingNGO = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!existingNGO) {
            throw new ForbiddenException('NGO does not existed');
        }
        const updateNGOStatus = await this.prisma.user.update({
            where: {
                email: dto.email
            },
            data: {
                ngoProfile: {
                    update: {
                        ngoStatus: dto.ngoStatus
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    select: { name: true }
                },
                ngoProfile: {
                    select: {
                        type: true,
                        purpose: true,
                        registrationID: true,
                        registeredCountry: true,
                        state: true,
                        city: true,
                        noOfStaff: true,
                        noOfBeneficiaries: true,
                        ngoStatus: true
                    }
                }
            }

        })
        return {
            message: 'NGO status updated successfully',
            status: 'success',
            data: updateNGOStatus
        };
    }

    // async findMe(currentUser: User) {
    //     return this.prisma.user.findUnique({
    //         where: { id: currentUser.id },
    //         select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             roleId: true,
    //             role: {
    //                 select: {
    //                     name: true
    //                 },
    //             },

    //             permission: {
    //                 select: {
    //                     id: true,
    //                     name: true,
    //                     key: true,
    //                     module: true,
    //                 },
    //             },


    //         },
    //     });
    // }

    async findMe(currentUser: User) {
        const aboutME = await this.prisma.user.findUnique({
            where: { id: currentUser.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                        RolePermission: {
                            select: {
                                permission: {
                                    select: {
                                        key: true,
                                        name: true,
                                        module: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const permissions =
            aboutME?.role?.RolePermission?.map((rp) => rp.permission.key) ?? [];

        // Safely remove RolePermission if role exists
        let roleWithoutPermissions = aboutME?.role
            ? { id: aboutME.role.id, name: aboutME.role.name }
            : undefined;


        return {
            aboutME: {
                ...aboutME,
                role: roleWithoutPermissions, // Role without RolePermission
            },
            permissions,
            // aboutME
        };
    }

    async generate_JWT(
        userId: number,
        email: string
    ): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET_KEY');

        const token = await this.jwt.sign(payload,
            {
                expiresIn: '340m',
                secret: secret,
            }
        );
        return {
            accessToken: token
        }
    }
}