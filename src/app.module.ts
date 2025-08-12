import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
// import { NGOModule } from './NGO Registration/ngo.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),PrismaModule,AuthModule,RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
