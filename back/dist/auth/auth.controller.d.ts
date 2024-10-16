import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/createUser.dto';
import { LoginUserDto } from 'src/users/loginUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<Omit<{
        user_name: string;
        user_lastname: string;
        nDni: number | null;
        birthday: Date | null;
        phone: string | null;
        country: string | null;
        role_id: string;
        user_id: string;
        profile_picture: string | null;
        isOlder: boolean;
        credential_id: string | null;
    }, "credential_id">>;
    signin(loginUser: LoginUserDto): Promise<{
        message: string;
        user: {
            user_name: string;
            user_lastname: string;
            nDni: number | null;
            birthday: Date | null;
            phone: string | null;
            country: string | null;
            role_id: string;
            user_id: string;
            profile_picture: string | null;
            isOlder: boolean;
            credential_id: string | null;
        };
    }>;
}
