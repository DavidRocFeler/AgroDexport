import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { UsersRepository } from '../users/users.repository'; 
import { User, Company } from '@prisma/client';
import { CompanyRepository } from '../companies/companies.repository';

type UserWithCompanies = User & {
  companies: Company[];
};

@Injectable()
export class ChatbotService {
  private readonly witUrl = 'https://api.wit.ai/message';
  private readonly accessToken = process.env.WIT_ACCESS_TOKEN;

  constructor(private readonly usersRepository: UsersRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  // Estado para manejar el flujo de actualización
  private updateState: { [userId: string]: { fields: string[]; awaitingValues: boolean; isCompanyUpdate?: boolean } } = {};
  
  // Estado para manejar el flujo de creación de compañía
  private createState: { [userId: string]: { fields: string[]; awaitingValues: boolean } } = {};

  async processMessage(message: string, userId: string): Promise<string> {
    console.log('Received message:', message);
    console.log('Received userId:', userId);

    try {
      // Si estamos esperando nuevos valores para una actualización
      if (this.updateState[userId]?.awaitingValues) {
        const fieldsToUpdate = this.updateState[userId].fields;
        const isCompanyUpdate = this.updateState[userId].isCompanyUpdate;
        delete this.updateState[userId];
        
        if (isCompanyUpdate) {
          return await this.handleUpdateCompanyFields(fieldsToUpdate, message, userId);
        }
        return await this.handleUpdateFields(fieldsToUpdate, message, userId);
      }

      // Si estamos esperando el nombre de la compañía para creación
      if (this.createState[userId]?.awaitingValues) {
        const fieldsToCreate = this.createState[userId].fields;
        delete this.createState[userId];
        return await this.handleCreateCompany(fieldsToCreate, message, userId);
      }

      // Solicitud a Wit.ai
      const response = await axios.get(this.witUrl, {
        params: { q: message },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      console.log('Wit.ai Response:', response.data);

      const intents = response.data.intents;
      const entities = response.data.entities;

      // Obtiene la información del usuario desde la base de datos
      let userInfo: UserWithCompanies | null = null;
      try {
        userInfo = await this.usersRepository.getUserById(userId) as UserWithCompanies;
        console.log('User info fetched:', userInfo);
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

          case 'capabilities':
            return `Our chatbot is here to help! It can answer your questions, provide platform information, and assist with creating, updating, and managing your user profile and associated companies. Let us know how we can assist you!`;

          case 'app_info':
              return `AgroDexports is a B2B platform focused on connecting buyers with trusted agricultural suppliers from Latin America to Europe and the U.S. We prioritize transparency, efficiency, and high-quality bulk exports to streamline your business operations. Join us in transforming agricultural trade!`;

          case 'query':
            console.log('Entities detected in Wit.ai response:', entities);
            return this.handleEntityResponse(entities, userInfo);

          case 'update':
            return await this.handleUpdateIntent(entities, userId);

          case 'create':
            return await this.handleCreateIntent(entities, userId);

          default:
            return "I'm sorry, I didn't understand that. Could you please rephrase?";
        }
      } else {
        return "I'm sorry, I didn't understand that. Could you please rephrase?";
      }
    } catch (error) {
      console.error(`Error in Wit.ai request: ${error.message}`);
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

  private handleEntityResponse(entities: any, userInfo: UserWithCompanies): string {
    const responses = [];

    if (entities['company_name:company_name'] && entities['company_name:company_name'][0].value !== '?') {
      if (userInfo.companies && userInfo.companies.length > 0) {
          const companyNames = userInfo.companies.map(company => company.company_name);
          responses.push(`Your company/companies are: ${companyNames.join(', ')}.`);
      } else {
          responses.push("You don't have any registered companies.");
      }
    }

    const companyAttributes = {
        'tax_identification_number:tax_identification_number': 'tax_identification_number',
        'address:address': 'address',
        'postal_code:postal_code': 'postal_code',
        'city:city': 'city',
        'state:state': 'state',
        'company_country:company_country': 'country',
        'industry:industry': 'industry',
        'website:website': 'website',
        'company_description:company_description': 'company_description'
    };

    Object.entries(companyAttributes).forEach(([entityKey, attributeKey]) => {
        if (entities[entityKey]) {
            if (userInfo.companies && userInfo.companies.length > 0) {
                userInfo.companies.forEach(company => {
                    const attributeValue = company[attributeKey] || 'not registered';
                    responses.push(`The ${attributeKey.replace('_', ' ')} of your company ${company.company_name} is ${attributeValue}.`);
                });
            } else {
                responses.push("You don't have any registered companies.");
            }
        }
    });

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

    return responses.length > 0 ? responses.join(' ') : "I couldn't find any information to answer your query.";
  }

  private async handleUpdateIntent(entities: any, userId: string): Promise<string> {
    const fields = [];
    let isCompanyUpdate = false;

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
    if (entities['nDni:nDni']) {
      fields.push("nDni");
    }

    const companyAttributes = {
      'tax_identification_number:tax_identification_number': 'tax_identification_number',
      'address:address': 'address',
      'postal_code:postal_code': 'postal_code',
      'city:city': 'city',
      'state:state': 'state',
      'company_country:company_country': 'country',
      'industry:industry': 'industry',
      'website:website': 'website',
      'company_description:company_description': 'company_description'
    };

    Object.keys(companyAttributes).forEach(entityKey => {
      if (entities[entityKey]) {
        fields.push(companyAttributes[entityKey]);
        isCompanyUpdate = true;
      }
    });

    if (fields.length > 0) {
      this.updateState[userId] = { fields, awaitingValues: true, isCompanyUpdate };
      return `Alright, please provide the new values for ${fields.map(f => f.replace('_', ' ')).join(' and ')} in the same order, separated by commas.`;
    }

    return "I'm sorry, I couldn't identify which fields you'd like to update.";
  }

  private async handleUpdateFields(fields: string[], values: string, userId: string): Promise<string> {
    const updates: Record<string, string> = {};
    const valuesArray = values.split(',').map(value => value.trim());

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

  private async handleUpdateCompanyFields(fields: string[], values: string, userId: string): Promise<string> {
    const updates: Record<string, string> = {};
    const valuesArray = values.split(',').map(value => value.trim());

    if (valuesArray.length !== fields.length) {
      return `The number of values provided (${valuesArray.length}) does not match the number of fields to update (${fields.length}). Please provide values in the correct format, separated by commas.`;
    }

    fields.forEach((field, index) => {
      updates[field] = valuesArray[index];
    });

    try {
      const userCompanies = await this.companyRepository.findCompaniesByUserId(userId);
      if (userCompanies.length === 0) {
        return "You don't have any registered companies to update.";
      }

      await this.companyRepository.update(userCompanies[0].company_id, updates);
      return `The ${fields.map(f => f.replace('_', ' ')).join(' and ')} for your company has been successfully updated to "${valuesArray.join(', ')}".`;
    } catch (error) {
      console.error("Error updating company information:", error);
      return "An error occurred while updating your company information. Please try again later.";
    }
  }

  private async handleCreateIntent(entities: any, userId: string): Promise<string> {
    const fields = [];

    if (entities['company_name:company_name']) {
      fields.push("company_name");
    }

    if (fields.length > 0) {
      this.createState[userId] = { fields, awaitingValues: true };
      return `Please provide the name for your new company.`;
    }

    return "I'm sorry, I couldn't identify the company name. Could you please provide it?";
  }

  private async handleCreateCompany(fields: string[], values: string, userId: string): Promise<string> {
    const valuesArray = values.split(',').map(value => value.trim());

    if (fields.length !== valuesArray.length) {
      return `The number of values provided does not match the expected fields. Please provide only the company name.`;
    }

    try {
      const companyName = valuesArray[0];

      const existingCompany = await this.companyRepository.findByUserIdAndName(userId, companyName);
      if (existingCompany) {
        return `You already have a company named "${companyName}". Please choose a different name.`;
      }

      const newCompany = await this.companyRepository.create({
        company_name: companyName,
        user_id: userId,
      });

      return `The company "${newCompany.company_name}" has been successfully created!`;
    } catch (error) {
      console.error("Error creating company:", error);
      return "An error occurred while creating your company. Please try again later.";
    }
  }
}
