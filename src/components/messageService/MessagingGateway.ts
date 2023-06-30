import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Message } from '../entities/message.entity';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: any;

  private connectedUsers: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // You can add custom logic here when a client connects
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.removeUser(client);
  }

  handleMessage(senderId: string, recipientId: string, message: string) {
    const senderSocket = this.connectedUsers.get(senderId);
    const recipientSocket = this.connectedUsers.get(recipientId);

    if (senderSocket && recipientSocket) {
      senderSocket.emit('message', message);
      recipientSocket.emit('message', message);
    } else {
      // Handle the case when either the sender or recipient is not connected
    }
  }

  addUser(client: Socket, userId: string) {
    this.connectedUsers.set(userId, client);
    console.log(`User connected: ${userId}`);
  }

  removeUser(client: Socket) {
    this.connectedUsers.forEach((value, key) => {
      if (value === client) {
        this.connectedUsers.delete(key);
        console.log(`User disconnected: ${key}`);
      }
    });
  }
}
