import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersRepository } from "src/users/users.repository";
import { randomPassword } from "src/utilities/randomPassword"; // Asegúrate de que esta función esté implementada
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "src/users/dtos/loginUser.dto";
import { EmailService } from "src/nodemail/nodemail";
import { CreateUserDto } from "src/users/dtos/createUser.dto";

@Injectable()
export class AuthRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly userRepository: UsersRepository,
        private readonly emailServices: EmailService

    ) {}

    async resetPassword(data: Partial<LoginUserDto>) {
        const email = data.email;
        const credentials = await this.userRepository.findCredentialByEmail(email);
        
        if (credentials) {
            const temporalPassword = randomPassword()
            const hashedPassword = await bcrypt.hash(temporalPassword, 10);

            await this.prisma.credential.update({
                where: { email: email },
                data: {
                    password: hashedPassword,
                },
            });

            const subject = "Reset Password Request";
            const text = `
            You got a new temporal password.
            Please change your password as soon as you log in to your account.
            Temporal Password: ${temporalPassword}
            `
            await this.emailServices.sendRegistrationEmail(email, subject, text)

            return { message: `An email with a temporal password was sent to ${email}`};
        }
        throw new NotFoundException('This Email was not found');
    }

    thirdSingIn(userData: Partial<CreateUserDto>) {
        const {email, user_name, password } = userData
        
    }

    
}