import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(user: User): Promise<Omit<User, 'password'>>;
    findEmail(email: string): Promise<User | null>;
}
