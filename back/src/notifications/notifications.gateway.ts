import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // Dominio del front
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  sendNotification(userId: string, notification: any) {
    // console.log(`Enviando notificación a usuario ${userId}:`, notification);
    this.server.to(userId).emit('newNotification', notification);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    client.join(userId);
    console.log(`Usuario ${userId} se ha unido a la sala ${userId}`);
  }
}
