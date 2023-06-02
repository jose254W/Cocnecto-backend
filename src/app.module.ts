import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './controller/controller.module';
import { ProfileService } from './components/profileService/Profile.service';
// import { ProfileRepository } from './components/repository/ProfileRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './components/entities/profile';
import { FirebaseAuthGuard } from 'firebase-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([Profile]),
  ],
  controllers: [AppController, ProfileController],
  providers: [AppService, ProfileService, FirebaseAuthGuard], // Add ProfileRepository to the providers
})
export class AppModule {}
