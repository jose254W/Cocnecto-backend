import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors();
  app.use(json());

  // Enable parsing of URL-encoded form data
  app.use(urlencoded({ extended: true }));

  await app.listen(3000);
}
bootstrap();
