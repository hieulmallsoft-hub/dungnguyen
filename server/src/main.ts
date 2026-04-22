import 'reflect-metadata';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT') || 5050);
  const allowedOrigins = String(configService.get('CLIENT_ORIGIN') || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  app.setGlobalPrefix('api');
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/api/uploads/' });
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });
  app.enableCors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  await app.listen(port);
  console.log(`Nest server listening on http://localhost:${port}`);
}

bootstrap();
