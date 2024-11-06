import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatbotService } from './chatbot.service';

@WebSocketGateway()
export class ChatbotController implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatbotService: ChatbotService) {}

  // Maneja la conexión de un cliente
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Maneja la desconexión de un cliente
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Maneja el mensaje de un usuario y responde con el mensaje del bot
  @SubscribeMessage('user_message')
  async handleMessage(
    @MessageBody() data: { message: string; userId: string }, // Modificado para recibir un objeto con message y userId
    @ConnectedSocket() client: Socket
  ) {
    const { message, userId } = data; // Desestructurar para obtener message y userId

    try {
      const botResponse = await this.chatbotService.processMessage(message, userId); // Pasar userId a processMessage
      console.log("Sending bot response to client:", botResponse);
      client.emit('bot_response', { text: botResponse }); // Enviar la respuesta solo al cliente específico
    } catch (error) {
      console.error("Error sending bot response:", error);
      client.emit('bot_response', { text: "An error occurred while processing your message." });
    }
  }
}
