<<<<<<< HEAD
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
=======
import { Body, Controller, Post } from '@nestjs/common';
import { UpdateCommissionDto } from './updateComission.dto';
import { UsersService } from './users.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post("/comission/sedeer")
    // @ApiExcludeEndpoint()
    // async preloadCategories(@Body() categoryData: UpdateCommissionDto){
    //     return this.usersService.preloadCommisionService();
    // }
>>>>>>> 9b42dfe5818b33af0e0b28092c9d4d42cb144839
}
