import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './controller/controller.module';
import { ProfileService } from './components/profileService/Profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './components/entities/profile';
import { FirebaseAuthGuard } from 'firebase-auth.guard';
import { Message } from './components/entities/message.entity';

import { MessagingService } from './components/messageService/messaging.service';
import { MessagingController } from './controller/messaging.controller';
import { ServerOptions } from 'socket.io';

import { ChatGateway } from './components/messageService/MessagingGateway';

// Custom Socket.io adapter
class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    options = {
      ...options,
      cors: {
        origin: '*',
      },
    };
    return super.createIOServer(port, options);
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([Profile, Message]), // Include the MessagingModule here
  ],
  controllers: [AppController, ProfileController, MessagingController],
  providers: [
    AppService,
    ProfileService,
    FirebaseAuthGuard,
    MessagingService,
    ChatGateway,
    {
      provide: IoAdapter,
      useClass: SocketIoAdapter, // Use the custom SocketIoAdapter
    },
  ],
})
export class AppModule {}
