import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersRepository } from "src/users/users.repository";
import { randomPassword } from "src/utilities/randomPassword"; // Asegúrate de que esta función esté implementada
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "src/users/dtos/loginUser.dto";
import { EmailService } from "src/nodemail/nodemail";
import { thirdAuthDto } from "./dtos/thirdauth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly userRepository: UsersRepository,
        private readonly emailServices: EmailService,
        private readonly jwtService: JwtService

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

    async thirdSingIn(userData: thirdAuthDto): Promise<{token: string}> {
        const {email, name, picture } = userData
        const credential = await this.userRepository.findCredentialByEmail(email)
        if ( credential ) {
            const user = await this.userRepository.findUserByCredentialId(credential.credential_id)
            const { user_id, user_name, role_id} = user
            const roll = await this.prisma.role.findUnique({ where: {role_id}})
            const userPayload = {
                sub: user_id,
                user_id: user_id,
                user_name: user_name,
                role: roll.role_name
            }
            const token = this.jwtService.sign(userPayload)
            return {token}
        }
        else {
            const roll = await this.prisma.role.findFirst()
            const credentials = await this.prisma.credential.create({
                data: {
                    email: email,
                    password: null
                }
            })
            const user = await this.prisma.user.create({
                data: {
                    user_name: name,
                    user_lastname: null,
                    isOlder: null,
                    role_id: roll.role_id,
                    credential_id: credential.credential_id,
                }
            })
            const userPayload = {
                sub: user.user_id,
                user_id: user.user_id,
                user_name: user.user_name,
                roll: roll.role_name
            }
            const token = this.jwtService.sign(userPayload)
            return {token}
        }
    }

    
}