
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
import { validateExists } from '../helpers/validation.helper';
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { RoleRepository } from '../roles/roles.repository';
import { thirdAuthDto } from '../auth/dtos/thirdauth.dto';
import { EmailService } from '../nodemail/nodemail.service';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationsService,
    private readonly rolesRepository: RoleRepository,
    private readonly emailService: EmailService
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  async getAllWithFilters(filters: any[]): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        AND: filters,
      },
      include: {
        role: true,
      },
    });
  }

  async findUsersWithIncompleteProfiles(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { nDni: null },
          { birthday: null },
          { phone: null },
          { country: null },
          { profile_picture: null },
        ],
      },
    });
  }
  

  async getUserById(user_id: string): Promise<User> {
    const user = await this.prisma.user.findUnique( { where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found'); 
    }
    return user;
  }

  async createUser(userData: Partial<CreateUserDto>): Promise<User> {
    const { user_name, user_lastname, role_name, isOlder, email, password } = userData;
    const role = await this.rolesRepository.getRoleByName(role_name);
  
    if (role) {

      const existingUser = await this.prisma.credential.findUnique({ where: { email } });
  
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newAccount = await this.prisma.credential.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });
  
        const newUser = await this.prisma.user.create({
          data: {
            user_name: user_name,
            user_lastname: user_lastname,
            isOlder: isOlder,
            role_id: role.role_id, 
            credential_id: newAccount.credential_id,
          },
        });

        await this.emailService.sendRegistrationEmail(
          userData.email, 
          'Welcome to AgroDexports', 
          userData.user_name,
          userData.role_name
        );

        return newUser;
      }
      throw new BadRequestException('The email is already in use');
    }

    throw new NotFoundException('The role is not found');
  }

  

  async createUserThird(userData: thirdAuthDto): Promise<User> {
    let user = await this.findUserByEmail(userData.email);
  
    if (!user) {
      const role = await this.rolesRepository.getRoleByName(userData.role_name);
  
      if (!role) {
        throw new BadRequestException('El rol especificado no existe');
      }
  
      const randomPassword = Math.random().toString(36).slice(-12);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      const credential = await this.prisma.credential.create({
        data: {
          email: userData.email,
          password: hashedPassword,
        },
      });
  
      user = await this.prisma.user.create({
        data: {
          user_name: userData.name,
          user_lastname: ' ',
          role_id: role.role_id,
          isOlder: true,
          credential_id: credential.credential_id,
        },
      });
    }

    await this.emailService.sendRegistrationEmail(
      userData.email, 
      'Welcome to AgroDexports', 
      userData.name,
      userData.role_name,
    );
  
    return user;
  }
  
  
  

  async singIn(credentials: LoginUserDto) {
    console.log(credentials)
    const { email, password } = credentials
    const account = await this.findCredentialByEmail(email)
    if ( account ) {
      const user = await this.prisma.user.findUnique({
        where: { credential_id: account.credential_id },  // Usar la credencial para encontrar el usuario
        include: { role: true },  // Incluir la relación con `role` para obtener `role_name`
      });

      const userId = user.user_id
      const accountPassword = account.password

      const isPasswordValid = await bcrypt.compare(password, accountPassword)

      if ( isPasswordValid ) {
        const userPayload = {
          sub: userId,
          user_id: userId,
          user_name: user.user_name,
          role: user.role.role_name,
        }

        const token = this.jwtService.sign(userPayload)
        return {
          token,
          user_id: userId,
          role_name: user.role.role_name,
        };
      }
    }
    else {
      throw new BadRequestException("Your password or Email is incorrect")
    }
  }

  async findCredentialByEmail(email: string) {
    return this.prisma.credential.findUnique({
      where: { email },
      include: {
        user: {
          select: {
            user_id: true,  
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
      },
    });
  }
  

  async findUserByCredentialId(credential_id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { credential_id },
      include: { role: true },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const credential = await this.prisma.credential.findUnique({
      where: { email },
      include: { user: true },
    });
    return credential?.user || null;
  }


  async updateUser(id: string, updateData: Partial<User & { password?: string }>): Promise<User> {
    try {
      const user = await this.getUserById(id);
  
      if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData, 10);
        await this.prisma.credential.update({
          where: { credential_id: user.credential_id },
          data: { password: hashedPassword },
        });
      }

      const updatedUser = await this.prisma.user.update({
        where: { user_id: id },
        data: updateData,
      });

      await this.notificationService.createAndNotifyUser(
        id, 
        'Your user data has been updated', 'UserUpdate'
      );
  
      return updatedUser;

    } catch (error) {
      if (error.code === 'P2002') { // Prisma usa P2002 para violación de restricciones únicas
        throw new ConflictException('El email ya está en uso');
      }
      throw error;
    }
  }
}