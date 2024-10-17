import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor (
        private readonly userRepository: UsersRepository
    ) {}

    updateUser(id: string, userData: CreateUserDto) {
        return this.userRepository.updateUser(id, userData)
    }
}
