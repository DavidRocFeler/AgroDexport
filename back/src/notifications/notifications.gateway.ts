import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env" });

@WebSocketGateway({
  cors: {
    origin: process.env.DOMAIN_FRONT,
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],  // Agregar esta línea
})

export class NotificationsGateway {
  constructor() {
    console.log('NotificationsGateway inicializado');
  }
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    
    const userId = client.handshake.query.userId as string; // Asegúrate de convertirlo a string
    console.log(`Cliente conectado: ${client.id}`);

    if (userId) {
      client.join(userId);
      console.log(`Cliente ${client.id} se ha unido a la sala ${userId}`);
    }
  
    this.server.to(client.id).emit('newNotification', {
      message: 'Notificación de prueba desde el backend',
    });
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
