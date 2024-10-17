import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
export declare class UsersRepository {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(id: string, userData: CreateUserDto): Promise<void>;
    singIn(credentials: LoginUserDto): Promise<{
        token: string;
    }>;
    findCredentialByEmail(email: string): Promise<Credential | null>;
    findUserByCredentialId(credential_id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}
