// src/roles/roles.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Roles")
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles(); 
  }


  @Post('seed') 
  async seedRoles(): Promise<Role[]> {
    return this.rolesService.seedRoles();
  }
}
