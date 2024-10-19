// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleRepository } from './roles.repository';
import { UsersRepository } from 'src/users/users.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, UsersRepository,PrismaService],
  exports: [RolesService, RoleRepository]
})
export class RolesModule {}
