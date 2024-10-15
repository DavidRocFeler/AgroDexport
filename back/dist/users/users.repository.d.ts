import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(user: Omit<User, 'user_id' | 'credential_id'>, email: string, password: string): Promise<Omit<User, 'credential_id'>>;
    findCredentialByEmail(email: string): Promise<Credential | null>;
    findUserByCredentialId(credential_id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}