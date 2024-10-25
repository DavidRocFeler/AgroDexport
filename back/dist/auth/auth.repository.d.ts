import { PrismaService } from "src/prisma/prisma.service";
import { UsersRepository } from "src/users/users.repository";
import { LoginUserDto } from "src/users/dtos/loginUser.dto";
import { EmailService } from "src/nodemail/nodemail.service";
import { thirdAuthDto } from "./dtos/thirdauth.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthRepository {
    private readonly prisma;
    private readonly userRepository;
    private readonly emailServices;
    private readonly jwtService;
    constructor(prisma: PrismaService, userRepository: UsersRepository, emailServices: EmailService, jwtService: JwtService);
    resetPassword(data: Partial<LoginUserDto>): Promise<{
        message: string;
    }>;
    thirdSingIn(userData: thirdAuthDto): Promise<{
        user_id: string;
        role_name: string;
        token: string;
    }>;
}
