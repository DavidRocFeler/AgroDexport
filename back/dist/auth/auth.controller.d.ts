import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dtos/loginUser.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<Omit<{
        user_name: string;
        user_lastname: string;
        isOlder: boolean;
        nDni: number | null;
        birthday: Date | null;
        phone: string | null;
        country: string | null;
        profile_picture: string | null;
        role_id: string;
        user_id: string;
        credential_id: string | null;
    }, "credential_id">>;
    signin(loginUser: LoginUserDto): Promise<void>;
}
