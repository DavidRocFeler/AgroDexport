import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatbotService {
  private readonly witUrl = 'https://api.wit.ai/message';
  private readonly accessToken = process.env.WIT_ACCESS_TOKEN;

  constructor() {}

  async processMessage(message: string): Promise<string> {
    try {
      const response = await axios.get(this.witUrl, {
        params: { q: message },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      // Verifica si la respuesta de Wit.ai tiene los datos correctos
      console.log('Wit.ai Response:', response.data);

      const intents = response.data.intents;
      
      if (intents && intents.length > 0) {
        const intent = intents[0].name;

        // Define la respuesta basada en el intent
        switch (intent) {
          case 'greeting':
            return 'Hello, welcome to AgroDexports! How can I assist you today?';
          default:
            return "I'm sorry, I didn't understand that. Could you please rephrase?";
        }
      } else {
        return "I'm sorry, I didn't understand that. Could you please rephrase?";
      }
    } catch (error) {
      console.error(`Error in Wit.ai request: ${error.message}`);
      return "Bot message not available due to an error";
    }
  }
}
