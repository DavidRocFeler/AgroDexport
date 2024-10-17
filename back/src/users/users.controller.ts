import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './users.repository';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags("user")
@Controller('users')
export class UsersController {
    
    constructor( 
        private readonly userServices: UsersService,
        private readonly usersRepository: UsersRepository
    ) {}

    @Get() 
    async getAllUsers(): Promise<User[]> {
    return this.userServices.getAllUsers();
    }

    @Get(':user_id')
      async findOne(@Param('user_id') user_id: string): Promise<User> {
        return this.usersRepository.getUserById(user_id); 
      }

    // @HttpCode(201)
    // @Post(':id')
    // async updateUser( @Param('id') id: string, @Body() userData: CreateUserDto) {
    //     return this.userServices.updateUser( id, userData)
    // }
}
