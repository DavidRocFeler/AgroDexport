import { LoginUserDto } from '../users/loginUser.dto';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/createUser.dto';
import { User } from '@prisma/client';
export declare class AuthService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    signUpService(userData: CreateUserDto): Promise<Omit<User, 'password'>>;
    signInService(loginUserDto: LoginUserDto): Promise<{
        message: string;
    }>;
}
