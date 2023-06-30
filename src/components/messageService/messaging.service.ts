import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { Socket } from 'socket.io';

@Injectable()
export class MessagingService {
  private readonly connectedUsers: Map<string, Socket> = new Map();

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async handleMessage(sender: string, content: string, recipientId: string) {
    const newMessage = { sender, content };
    const savedMessage = await this.createMessage(newMessage);
    this.sendMessage(savedMessage, recipientId);
  }

  async createMessage(message: Partial<Message>): Promise<Message> {
    const newMessage = this.messageRepository.create(message);
    return this.messageRepository.save(newMessage);
  }

  sendMessage(message: Message, recipientId: string) {
    const recipientSocket = this.connectedUsers.get(recipientId);
    if (recipientSocket) {
      recipientSocket.emit('message', message);
    } else {
      // Handle recipient not found error
      console.log(`Recipient with ID ${recipientId} not found.`);
    }
  }

  addUser(userId: string, userSocket: Socket) {
    this.connectedUsers.set(userId, userSocket);
  }

  removeUser(userId: string) {
    this.connectedUsers.delete(userId);
  }
}
