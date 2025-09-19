import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import InjectSwagger from './core/injectors/swagger.injector';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // GLOBAL PREFIX + API VERSIONING ENABLED
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // INJECT SWAGGER CONFIGURATIONS
  InjectSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transforms incoming payloads to DTO instances
      whitelist: true, // Strips out properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
