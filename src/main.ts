import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '50mb' }));

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors();

  // Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // Add other Firebase configuration options if needed
  });

  // Start the application
  await app.listen(3000);
}

bootstrap();
