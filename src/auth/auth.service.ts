import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dto/signup-dto";
import { ConfigService } from "@nestjs/config";
import bcrypt from "node_modules/bcryptjs";
import { SignInDto } from "./dto/signin-dto";
import { JwtService } from "@nestjs/jwt";

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

            const existingUserName = await this.prisma.user.findFirst({
                where: {
                    userName: dto.userName
                }
            })
            if (existingUserName) {
                throw new ForbiddenException('UserName & Email Already Exist');
            }

            const hashed = await bcrypt.hash(dto.password, 10)

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashed,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    userName: dto.userName,
                    roleId: dto.roleId,

                }
            })

            return {
                message: 'User created successfully',
                status: 'success',

                data: {
                    id: user?.id,
                    email: user?.email,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    userName: user?.userName,
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
                firstName: existingUser?.firstName,
                token: await this.generate_JWT(existingUser.id, existingUser.email)
            },
        }
    }

    async generate_JWT(
        userId: number,
        email: string
    ): Promise<{ access_Token: string }> {
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
            access_Token: token
        }
    }
}