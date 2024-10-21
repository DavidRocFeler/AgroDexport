import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './users.repository';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/RolesGuard';
import { Roles } from '../decorators/roles.decorator';

@ApiTags("user")
@Controller('users')
export class UsersController {
    
    constructor( 
        private readonly userServices: UsersService,
        private readonly usersRepository: UsersRepository
    ) {}


    @ApiBearerAuth()
    @HttpCode(200)
    @Get() 
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    async getAllUsers(): Promise<User[]> {
    return this.userServices.getAllUsers();
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':user_id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier', 'buyer')  
      async findOne(@Param('user_id') user_id: string): Promise<User> {
        return this.usersRepository.getUserById(user_id); 
      }

      // @ApiBearerAuth()      
      // @HttpCode(200)
      // @Put(':id')
      // async updateUser(
        // @Param('id', new ParseUUIDPipe()) id: string,
        // @Body() updateData: UpdateUserDto) {
        // return await this.userServices.updateUserService(id, updateData);
      // }


    @ApiBearerAuth()
    @HttpCode(200)
      @Put(':id')
      @UseGuards(AuthGuard, RolesGuard)
      @Roles('supplier', 'buyer')
      async updateUser(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateData: UpdateUserDto) {
        return await this.userServices.updateUserService(id, updateData);
      }
}
