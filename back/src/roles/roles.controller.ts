// src/roles/roles.controller.ts
import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/RolesGuard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags("Roles")
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles(); 
  }

  @ApiExcludeEndpoint()
  @Post('seed') 
  async seedRoles(): Promise<Role[]> {
    return this.rolesService.seedRoles();
  }
}
