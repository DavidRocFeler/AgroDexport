import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/createUser.dto';
import { LoginUserDto } from 'src/users/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @HttpCode(201)
    @Post('signup')
    async signup(@Body() user:CreateUserDto){
        const newUser = await this.authService.signUpService(user);
        return newUser;
    }

    @HttpCode(201)
    @Post('signin')
    async signin(@Body() loginUser: LoginUserDto) {
        return await this.authService.signInService(loginUser);
    }
}
