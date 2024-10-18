import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Role } from '@prisma/client';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}


  async getAllRoles(): Promise<Role[]> {
    return this.prisma.role.findMany(); 
    
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({
      data: {
        role_name: createRoleDto.role_name,
        role_description: createRoleDto.role_description,
      },
    });
  }

  async getRoleByName(roleName: string): Promise<Role | null> {
    return this.prisma.role.findFirst({
      where: { role_name: roleName },
    });
  }
}
