import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './controller/controller.module';
@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
