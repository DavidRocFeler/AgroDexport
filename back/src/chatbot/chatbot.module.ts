import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  providers: [ChatbotService, ChatbotController],
  imports: [UsersModule, CompaniesModule]
})
export class ChatbotModule {}
