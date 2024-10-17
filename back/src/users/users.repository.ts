import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
import { validateExists } from '../helpers/validation.helper';
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany(); 
  }

  async getUserById(user_id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { user_id }, 
    });

    if (!user) {
      throw new NotFoundException('User not found'); 
    }

    return user;
  }


  async createUser(userData: CreateUserDto): Promise<User> {
    const { user_name, user_lastname, role_id, isOlder, email, password } = userData;

    const roleExists = await this.prisma.role.findUnique({
      where: { role_id: userData.role_id },
    });

    if (!roleExists) {
      throw new NotFoundException('The role is not found'); 
    }
    
    const existingUser = await this.prisma.credential.findUnique({
        where: { email } 
    });

    
    if (existingUser) {
        throw new BadRequestException("The email is already in use");
    }

    
    const newUser = await this.prisma.user.create({
        data: {
            user_name: user_name,
            user_lastname: user_lastname,
            isOlder: isOlder,
            role_id: role_id,
            
        }
    });

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await this.prisma.credential.create({
        data: {
            email: email,
            password: hashedPassword
        }
    });

   
    await this.prisma.user.update({
        where: { user_id: newUser.user_id },
        data: { credential_id: newAccount.credential_id } 
    });

    return newUser; 
}

  // async updateUser(id: string, userData: CreateUserDto): Promise<void> {
  //   const { user_name, user_lastname, nDni, birthday, phone, country, role_id, isOlder, profile_picture } = userData
  //   const user = await this.prisma.user.findUnique({
  //     where: {user_id: id}
  //   })
  //   if (user) {
  //     user.user_name = user_name
  //     user.birthday = birthday
  //     user.country = country
  //     user.isOlder = isOlder
  //     user.nDni = nDni
  //     user.phone = phone
  //     user.user_lastname = user_lastname
  //     user.role_id = role_id
  //     user.profile_picture = profile_picture
  //   }
  // }

  async singIn(credentials: LoginUserDto): Promise<{token: string}> {
    const { email, password } = credentials
    const account = await this.findCredentialByEmail(email)
    if ( account ) {
      const user = await this.findUserByCredentialId(account.credential_id)
      const userId = user.user_id
      const accountPassword = account.password
      const isPasswordValid = await bcrypt.compare(password, accountPassword)
      if ( isPasswordValid ) {
        const userPayload = {
          sub: userId,
          id: userId,
          userName: user.user_name
        }
        const token = this.jwtService.sign(userPayload)
        return {token, }
      }
    }
    else {
      throw new BadRequestException("Your password or Email is incorrect")
    }
  }

  async findCredentialByEmail(email: string): Promise<Credential | null> {
    return this.prisma.credential.findUnique({
      where: { email },
    });
  }

  async findUserByCredentialId(credential_id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { credential_id },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const credential = await this.prisma.credential.findUnique({
      where: { email },
      include: { user: true },
    });
    return credential?.user || null;
  }
}