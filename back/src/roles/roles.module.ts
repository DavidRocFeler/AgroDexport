// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleRepository } from './roles.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, PrismaService],
})
export class RolesModule {}
