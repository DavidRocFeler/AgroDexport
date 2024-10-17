import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
import * as bcrypt from "bcrypt"
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser (userData: CreateUserDto ): Promise<User> {
    const { user_name, user_lastname, nDni, birthday, phone, country, role_id, isOlder, email, password} = userData
    const credentials = await this.findCredentialByEmail(email)
    if (!credentials) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newAccount = await this.prisma.credential.create({
        data: {
          email: email,
          password: hashedPassword
        }
      })
      const newUser = await this.prisma.user.create({
        data: {
          user_name: user_name,
          user_lastname: user_lastname, 
          nDni: nDni, 
          birthday: birthday, 
          phone: phone, 
          country: country,
          isOlder: isOlder,
          role_id: role_id,
          credential_id: newAccount.credential_id
        }
      })
      return newUser
    }
    else{
      throw new BadRequestException("The email is already in use")
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
