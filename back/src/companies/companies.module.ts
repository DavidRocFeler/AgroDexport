// src/companies/companies.module.ts
import { Module } from '@nestjs/common';
import { CompanyController } from './companies.controller';
import { CompanyService } from './companies.service';
import { CompanyRepository } from './companies.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, PrismaService],
  imports: [UsersModule],
  exports: [CompanyService, CompanyRepository],
})
export class CompaniesModule {}
