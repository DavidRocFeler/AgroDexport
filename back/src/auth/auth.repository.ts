import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersRepository } from "src/users/users.repository";
import { randomPassword } from "src/utilities/randomPassword"; // Asegúrate de que esta función esté implementada
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "src/users/dtos/loginUser.dto";
import { EmailService } from "src/nodemail/nodemail.service";
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
        const temporalPassword = randomPassword(); // Generar la contraseña temporal
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
        `;
    
        // Usar el método sendResetPasswordEmail para enviar el correo con la contraseña temporal
        await this.emailServices.sendResetPasswordEmail(email, subject, text);
    
        return { message: `An email with a temporal password was sent to ${email}` };
      }
    
      throw new NotFoundException('This Email was not found');
    }
    

    async thirdSingIn(userData: thirdAuthDto): Promise<{ user_id: string, role_name: string, token: string }> {
        const { email } = userData;
      
        const credential = await this.userRepository.findCredentialByEmail(email);
        
        if (credential && credential.user) {
          const { user_id, role, isActive } = credential.user;

          if (!isActive) {
            throw new UnauthorizedException('User account is banned.');
          }
          
          const userPayload = {
            sub: user_id,
            user_id,
            role: role ? role.role_name : 'No role',
          };
          
          console.log(userPayload);
      
          const token = this.jwtService.sign(userPayload);
          return {
            token,
            user_id,
            role_name: role ? role.role_name : 'No role',
          };

        } else {
            throw new UnauthorizedException('User not found. Please register first.');
        }
      }
      
    
}