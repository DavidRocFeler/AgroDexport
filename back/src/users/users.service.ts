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

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
      }

    async getUserById(user_id: string): Promise<User> {
        return this.userRepository.getUserById(user_id); 
      }

    async updateUserService(id: string, updateData: UpdateUserDto): Promise<User> {
        validateRequestBodyNotEmpty(updateData);
            return await this.userRepository.updateUser(id, updateData);
        }      
}
