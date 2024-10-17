import { LoginUserDto } from '../users/dtos/loginUser.dto';
import { UsersRepository } from '../users/users.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
export declare class AuthService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    signUpService(userData: CreateUserDto): Promise<Omit<User, 'credential_id'>>;
    signInService(credentials: LoginUserDto): Promise<void>;
}
