import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/createUser.dto';
import { LoginUserDto } from 'src/users/loginUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<Omit<{
        user_name: string;
        user_lastname: string;
        email: string;
        password: string;
        nDni: number;
        birthday: Date;
        phone: string | null;
        country: string | null;
        role_id: string;
        user_id: string;
    }, "password">>;
    signin(loginUser: LoginUserDto): Promise<{
        message: string;
    }>;
}
