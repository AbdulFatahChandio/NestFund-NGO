import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { CampaignModule } from './Campaign/campaign.module';
import { DonationModule } from './Donation/donation.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PrismaModule, AuthModule, RoleModule, CampaignModule, DonationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
