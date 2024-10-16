import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Credential } from '@prisma/client';
import { validateExists } from '../helpers/validation.helper';
import { UpdateCommissionDto } from './updateComission.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: Omit<User, 'user_id' | 'credential_id'>, email: string, password: string): Promise<Omit<User, 'credential_id'>> {
    const checkEmail = await this.findCredentialByEmail(email);
    validateExists(checkEmail, 'exists', 'Email already exists');

    if (user.nDni) {
      const checkDni = await this.prisma.user.findUnique({
        where: { nDni: user.nDni },
      });
      validateExists(checkDni, 'exists', 'DNI already exists');
    }

    const newCredential = await this.prisma.credential.create({
      data: {
        email: email,
        password: password,
      },
    });

    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        credential_id: newCredential.credential_id, 
      },
    });

    return newUser;
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

  async findCommission() {
    // Busca si existe alguna comisión en la base de datos
    return this.prisma.commission.findFirst();
  }

//   async createCommission(commissionData: UpdateCommissionDto) {
//     return this.prisma.commission.create({
//       data: {
//         commision_percentage: commissionData.commision_percentage,
//         commision_date: new Date()
//       }
//     });
// }
}
