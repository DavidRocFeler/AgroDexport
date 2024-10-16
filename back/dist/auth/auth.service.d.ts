import { LoginUserDto } from '../users/loginUser.dto';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/createUser.dto';
import { User } from '@prisma/client';
export declare class AuthService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    signUpService(userData: CreateUserDto): Promise<Omit<User, 'credential_id'>>;
    signInService(loginUserDto: LoginUserDto): Promise<{
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
