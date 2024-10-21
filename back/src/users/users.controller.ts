import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './users.repository';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
    @ApiQuery({ name: 'role', required: false, description: 'Role of the user' })
    @ApiQuery({ name: 'country', required: false, description: 'Country of the user' })
    @ApiQuery({ name: 'lastname', required: false, description: 'Last name of the user' })
    @ApiQuery({ name: 'name', required: false, description: 'Name of the user' })
    async getAllUsers(
      @Query('role') role?: string,
      @Query('country') country?: string,
      @Query('lastname') user_lastname?: string,
      @Query('name') user_name?: string,
    ): Promise<User[]> {
      const filters = [];

      if (role) {
        filters.push({ role: { role_name: role } });
      }
    
      if (country) {
        filters.push({ country });
      }
    
      if (user_lastname) {
        filters.push({ user_lastname: { contains: user_lastname, mode: 'insensitive' } });
      }
    
      if (user_name) {
        filters.push({ user_name: { contains: user_name, mode: 'insensitive' } });
      }

      if (filters.length === 0) {
        return this.userServices.getAllUsersService();
      }
      return this.userServices.getAllWithFiltersService(filters);
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
