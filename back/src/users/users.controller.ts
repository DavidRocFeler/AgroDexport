import { Body, Controller, Post } from '@nestjs/common';
import { UpdateCommissionDto } from './updateComission.dto';
import { UsersService } from './users.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("/comission/sedeer")
    @ApiExcludeEndpoint()
    async preloadCategories(@Body() categoryData: UpdateCommissionDto){
        return this.usersService.preloadCommisionService();
    }
}
