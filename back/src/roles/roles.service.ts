import { Injectable } from '@nestjs/common';
import { RoleRepository } from './roles.repository';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.createRole(createRoleDto);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.getAllRoles(); 
  }

  async seedRoles(): Promise<Role[]> {
    const rolesData: CreateRoleDto[] = [
      { role_name: 'buyer', role_description: 'Role for buyers in the system' },
      { role_name: 'supplier', role_description: 'Role for suppliers in the system' },
      { role_name: 'admin', role_description: 'Administrator role with all permissions' },
    ];

    const roles = [];

    for (const roleData of rolesData) {
      
      const existingRole = await this.roleRepository.getRoleByName(roleData.role_name);
      if (!existingRole) {
        
        const role = await this.createRole(roleData);
        roles.push(role);
      } else {
        
        roles.push(existingRole);
      }
    }

    return roles;
  }
}
