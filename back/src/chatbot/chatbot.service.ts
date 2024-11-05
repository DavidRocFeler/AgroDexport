import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { UsersRepository } from '../users/users.repository'; 
import { User } from '@prisma/client';

@Injectable()
export class ChatbotService {
  private readonly witUrl = 'https://api.wit.ai/message';
  private readonly accessToken = process.env.WIT_ACCESS_TOKEN;

  constructor(private readonly usersRepository: UsersRepository) {}

  // Estado para manejar el flujo de actualización
  private updateState: { [userId: string]: { fields: string[]; awaitingValues: boolean } } = {};

  async processMessage(message: string, userId: string): Promise<string> {
    // console.log('Received message:', message);
    // console.log('Received userId:', userId);

    try {
      // Si estamos esperando nuevos valores para una actualización
      if (this.updateState[userId]?.awaitingValues) {
        const fieldsToUpdate = this.updateState[userId].fields;
        delete this.updateState[userId];
        return await this.handleUpdateFields(fieldsToUpdate, message, userId);
      }

      // Solicitud a Wit.ai
      const response = await axios.get(this.witUrl, {
        params: { q: message },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      // console.log('Wit.ai Response:', response.data);

      const intents = response.data.intents;
      const entities = response.data.entities;

      // Obtiene la información del usuario desde la base de datos
      let userInfo: User | null = null;
      try {
        userInfo = await this.usersRepository.getUserById(userId);
        // console.log('User info fetched:', userInfo);
      } catch (error) {
        if (error instanceof NotFoundException) {
          return "I couldn't find your information. Please make sure you're registered.";
        } else {
          return "An unexpected error occurred while retrieving your information.";
        }
      }

      if (intents && intents.length > 0) {
        const intent = intents[0].name;

        // Responde según el intent y las entidades detectadas
        switch (intent) {
          case 'user_information_query': 
            return this.handleQueryIntent(userInfo);

          case 'greeting':
            return `Hello ${userInfo?.user_name || 'there'}, welcome to AgroDexports! How can I assist you today?`;

          case 'query':
            // console.log('Entities detected in Wit.ai response:', entities);
            return this.handleEntityResponse(entities, userInfo);

          case 'update':
            return await this.handleUpdateIntent(entities, userId);

          default:
            return "I'm sorry, I didn't understand that. Could you please rephrase?";
        }
      } else {
        return "I'm sorry, I didn't understand that. Could you please rephrase?";
      }
    } catch (error) {
      // console.error(`Error in Wit.ai request: ${error.message}`);
      return "Bot message not available due to an error.";
    }
  }

  // Método para manejar `user_information_query` y devolver la información completa del usuario
  private handleQueryIntent(userInfo: User): string {
    return `Here is your profile information:
    - Name: ${userInfo.user_name || 'not registered'}
    - Last name: ${userInfo.user_lastname || 'not registered'}
    - DNI: ${userInfo.nDni || 'not registered'}
    - Country: ${userInfo.country || 'not registered'}
    - Birthday: ${userInfo.birthday || 'not registered'}
    - Phone: ${userInfo.phone || 'not registered'}
    - Profile picture: ${userInfo.profile_picture || 'not registered'}
    `;
  }

  // Método para manejar `query` y responder solo con los campos relevantes detectados
  private handleEntityResponse(entities: any, userInfo: User): string {
    const responses = [];

    // Procesa solo las entidades presentes y relevantes, sin valores ambiguos
    if (entities['user_lastname:user_lastname'] && entities['user_lastname:user_lastname'][0].value !== '?') {
        responses.push(`Your last name is ${userInfo.user_lastname || 'not registered'}.`);
    }

    if (entities['user_name:user_name'] && entities['user_name:user_name'][0].value !== '?') {
        responses.push(`Your name is ${userInfo.user_name || 'not registered'}.`);
    }

    if (entities['nDni:nDni'] && entities['nDni:nDni'][0].value !== '?') {
        responses.push(`Your DNI is ${userInfo.nDni || 'not registered'}.`);
    }

    if (entities['country:country'] && entities['country:country'][0].value !== '?') {
        responses.push(`Your country is ${userInfo.country || 'not registered'}.`);
    }

    if (entities['birthday:birthday'] && entities['birthday:birthday'][0].value !== '?') {
        responses.push(`Your birthday is ${userInfo.birthday || 'not registered'}.`);
    }

    if (entities['phone:phone'] && entities['phone:phone'][0].value !== '?') {
        responses.push(`Your phone number is ${userInfo.phone || 'not registered'}.`);
    }

    // Unimos todas las respuestas en una sola cadena
    return responses.length > 0 ? responses.join(' ') : "I couldn't find any information to answer your query.";
  }

  // Maneja el intent `update` para múltiples campos
  private async handleUpdateIntent(entities: any, userId: string): Promise<string> {
    const fields = [];

    if (entities['user_name:user_name']) {
      fields.push("user_name");
    }
    if (entities['user_lastname:user_lastname']) {
      fields.push("user_lastname");
    }
    if (entities['phone:phone']) {
      fields.push("phone");
    }
    if (entities['country:country']) {
      fields.push("country");
    }
    if (entities['birthday:birthday']) {
      fields.push("birthday");
    }

    if (fields.length > 0) {
      this.updateState[userId] = { fields, awaitingValues: true };
      return `Alright, please provide the new values for ${fields.map(f => f.replace('_', ' ')).join(' and ')} and only for multiple changes, in the same order, separated by commas.`;
    }

    return "I'm sorry, I couldn't identify which fields you'd like to update.";
  }

  // Maneja la actualización de múltiples campos
  private async handleUpdateFields(fields: string[], values: string, userId: string): Promise<string> {
    const updates: Record<string, string> = {};
    const valuesArray = values.split(',').map(value => value.trim());

    // Asegura que el número de valores coincida con el de los campos
    if (valuesArray.length !== fields.length) {
      return `The number of values provided (${valuesArray.length}) does not match the number of fields to update (${fields.length}). Please provide values in the correct format, separated by commas.`;
    }

    fields.forEach((field, index) => {
      updates[field] = valuesArray[index];
    });

    try {
      await this.usersRepository.updateUser(userId, updates);
      return `Your ${fields.map(f => f.replace('_', ' ')).join(' and ')} has been successfully updated to "${valuesArray.join(', ')}".`;
    } catch (error) {
      console.error("Error updating user information:", error);
      return "An error occurred while updating your information. Please try again later.";
    }
  }
}
