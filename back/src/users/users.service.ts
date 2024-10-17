import { Get, Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';

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

      

    // updateUser(id: string, userData: CreateUserDto) {
    //     return this.userRepository.updateUser(id, userData)
    // }
}
