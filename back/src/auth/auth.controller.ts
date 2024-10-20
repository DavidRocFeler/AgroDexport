import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dtos/loginUser.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { thirdAuthDto } from './dtos/thirdauth.dto';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ){}

    @HttpCode(201)
    @Post('signup')
    async signup(@Body() user:CreateUserDto){
        console.log("datos recibidos", user)
        const newUser = await this.authService.signUpService(user);
        return newUser;
    }

    @HttpCode(201)
    @Post('thirdsignup')
    async thirdSignup(@Body() user:thirdAuthDto){
        const newUser = await this.authService.thirdSignupService(user);
        return newUser;
    }

    @HttpCode(201)
    @Post('signin')
    async signin(@Body() loginUser: LoginUserDto) {
        return await this.authService.signInService(loginUser);
    }

    @Post("sedeer")
    @ApiExcludeEndpoint()
    async preloadUsers(@Body() usersData: CreateUserDto){
        return this.authService.preloadUsersService();
    }

    @Post("thirdsingin") 
    async thirdAuth(userData: thirdAuthDto) {
        console.log("datos recividos", userData)
        return this.authService.thirdSingIn(userData)
    }

    @Post("passwordrecovery") 
    async passwordRecovery(@Body() email: Partial<LoginUserDto>) {
        return this.authService.passwordRecovery(email)
    }
}
