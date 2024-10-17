import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
    constructor( 
        private readonly userServices: UsersService
    ) {}

    @HttpCode(201)
    @Post(':id')
    async updateUser( @Param('id') id: string, @Body() userData: CreateUserDto) {
        return this.userServices.updateUser( id, userData)
    }
}
