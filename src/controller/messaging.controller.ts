import { Controller, Get, Post, Body, OnModuleInit } from '@nestjs/common';
import { MessagingService } from '../components/messageService/messaging.service';
import { Socket } from 'socket.io';

@Controller('messaging')
export class MessagingController implements OnModuleInit {
  constructor(private readonly messagingService: MessagingService) {}

  onModuleInit() {
    // Simulate server connection and registering event handler
    const mockSocket = {} as Socket; // Replace with the actual socket instance
    const userId = '123'; // Replace with the user ID of the connected user
    this.messagingService.addUser(userId, mockSocket);
  }

  @Post('send')
  sendMessage(
    @Body() message: { sender: string; content: string; recipientId: string },
  ) {
    this.messagingService.handleMessage(
      message.sender,
      message.content,
      message.recipientId,
    );
  }

  @Get('receive')
  async getAllMessages() {
    return this.messagingService.getAllMessages();
  }
}
