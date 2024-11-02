import { Get, Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
import { validateRequestBodyNotEmpty } from '../helpers/validation.helper';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
    constructor (
        private readonly userRepository: UsersRepository
    ) {}

    async getAllUsersService(): Promise<User[]> {
      return this.userRepository.getAllUsers();
    }

    async getAllWithFiltersAndSorting(filters: any[], sortBy?: string, order: 'asc' | 'desc' = 'asc'): Promise<User[]> {
      return this.userRepository.getAllWithFiltersAndSorting(filters, sortBy, order);
    }

    async getUserById(user_id: string): Promise<User> {
        return this.userRepository.getUserById(user_id); 
      }


    async updateUserService(id: string, updateData: UpdateUserDto): Promise<User> {
        validateRequestBodyNotEmpty(updateData);
            return await this.userRepository.updateUser(id, updateData);
        }      

        async deleteUserService(user_id: string): Promise<void> {
          await this.userRepository.deleteUser(user_id);
      }
}
