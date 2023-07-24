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

  async getAllUserChats(): Promise<string[]> {
    // Fetch all distinct sender IDs from the messages
    const senders = await this.messageRepository.query(
      `SELECT DISTINCT "sender" FROM "message"`,
    );

    // Extract sender IDs from the results
    const senderIds = senders.map(
      (sender: { senderId: any }) => sender.senderId,
    );

    return senderIds;
  }

  async handleMessage(sender: string, content: string, userId: string) {
    console.log('Received message:', { sender, content, userId });
    const newMessage = { sender, content, userId };
    const savedMessage = await this.createMessage(newMessage);
    console.log('Saved message:', savedMessage);
    this.sendMessage(savedMessage, userId);
    console.log('Message sent to recipient');
  }

  async createMessage(message: Partial<Message>): Promise<Message> {
    const newMessage = this.messageRepository.create(message);
    return this.messageRepository.save(newMessage);
  }

  sendMessage(message: Message, userId: string) {
    const recipientSocket = this.connectedUsers.get(userId);
    if (recipientSocket) {
      recipientSocket.emit('message', message);
    } else {
      console.log(`Recipient with ID ${userId} not found.`);
    }
  }

  addUser(userId: string, userSocket: Socket) {
    this.connectedUsers.set(userId, userSocket);
  }

  removeUser(userId: string) {
    this.connectedUsers.delete(userId);
  }
}
