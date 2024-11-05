import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';

@Module({
  providers: [ChatbotService, ChatbotController]
})
export class ChatbotModule {}
