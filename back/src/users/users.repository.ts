import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { validateExists } from '../helpers/validation.helper';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}


  async createUser(user: User): Promise<Omit<User, 'password'>> {
    const checkEmail = await this.findEmail(user.email);
    validateExists(checkEmail, 'exists', 'Email already exists');

    const checkDni = await this.prisma.user.findUnique({
      where: { nDni: user.nDni },
    });
    validateExists(checkDni, 'exists', 'DNI already exists');

    const newUser = await this.prisma.user.create({
      data: user,
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
