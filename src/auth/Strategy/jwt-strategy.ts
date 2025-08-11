import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { strategies } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
//import { Strategy } from "passport-local";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy
) {
    constructor(
        config: ConfigService,
        public prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow('JWT_SECRET_KEY')
        })
    }

    async validate(payload: {
        sub: number,
        email: string
    }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            }
        })
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user

    }
}