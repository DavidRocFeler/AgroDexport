import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
import { validateExists } from '../helpers/validation.helper';
import { CreateUserDto } from './createUser.dto';
import { User } from '@clerk/nextjs/dist/types/server';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // async createUser(user: Omit<User, 'user_id' | 'credential_id'>, email: string, password: string): Promise<Omit<User, 'credential_id'>> {
    // const checkEmail = await this.findCredentialByEmail(email);
    // validateExists(checkEmail, 'exists', 'Email already exists');

    // if (user.nDni) {
      // const checkDni = await this.prisma.user.findUnique({
        // where: { nDni: user.nDni },
      // });
      // validateExists(checkDni, 'exists', 'DNI already exists');
    // }

    // const newCredential = await this.prisma.credential.create({
      // data: {
        // email: email,
        // password: password,
      // },
    // });

    // const newUser = await this.prisma.user.create({
      // data: {
        // ...user,
        // credential_id: newCredential.credential_id, 
      // },
    // });

    // return newUser;
  // }

  async creareUser (userData: CreateUserDto ): Promise<User> {

    const {user_name, user_lastname, email, password, confirmPassword, nDni, birthday, phone, country, role_id} = userData
    const user = await this.findCredentialByEmail(email)

    if (!user) {
      const newUser = await this.prisma.user.create({
        data : {
          user_name: user_name,
          user_lastname: user_lastname,
          email: email,
          password: password,
          nDni: nDni,
          birthday: birthday,
          phone: phone,
          country: country,
          role_id: role_id
        }
      })
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
