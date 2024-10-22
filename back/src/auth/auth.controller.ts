import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dtos/loginUser.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @ApiOperation({ summary: 'Signup with third-party authentication (e.g., Google)' })
    @ApiResponse({ status: 201, description: 'Signup successful. Returns the new user.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
    @ApiBody({ type: thirdAuthDto, description: 'User data for third-party signup' })
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
    @HttpCode(200)
    @ApiOperation({ summary: 'Login with third-party authentication (e.g., Google)' })
    @ApiResponse({ status: 200, description: 'Login successful. Returns a JWT token.' })
    @ApiResponse({ status: 401, description: 'User not found. Please register first.' })
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'juanperez@gmail.com', description: "User's email from third-party provider" },
            name: { type: 'string', example: 'Juan Pérez', description: "User's name from third-party provider" },
          },
          required: ['email', 'name'],
        },
      })
    async thirdAuth(@Body() userData: thirdAuthDto) {
        console.log("datos recibidos", userData)
        return this.authService.thirdSingIn(userData)
    }

    @Post("passwordrecovery") 
    async passwordRecovery(@Body() email: Partial<LoginUserDto>) {
        return this.authService.passwordRecovery(email)
    }
}
