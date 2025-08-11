import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtStrategy } from "./Strategy/jwt-strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
     imports: [PrismaModule
        ,PassportModule, JwtModule.register({
    secret: 'nomnom',
    signOptions: { expiresIn: '1d' },
  })],
    providers:[AuthService,JwtStrategy],
    controllers:[AuthController]
})

export class AuthModule{}