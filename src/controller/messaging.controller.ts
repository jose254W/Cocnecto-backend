import { Controller, Get, Post, Body, OnModuleInit } from '@nestjs/common';
import { MessagingService } from '../components/messageService/messaging.service';

@Controller('messaging')
export class MessagingController implements OnModuleInit {
  constructor(private readonly messagingService: MessagingService) {}

  onModuleInit() {
    // No need for additional code in this method
  }

  @Post('send')
  async sendMessage(
    @Body() message: { sender: string; content: string; userId: string },
  ) {
    await this.messagingService.handleMessage(
      message.sender,
      message.content,
      message.userId,
    );
  }

  @Get('receive')
  async getAllMessages() {
    return this.messagingService.getAllMessages();
  }
}
