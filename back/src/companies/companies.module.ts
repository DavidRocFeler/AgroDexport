import { Module } from '@nestjs/common';
import { CompanyController } from './companies.controller';
import { CompanyService } from './companies.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService]
})
export class CompaniesModule {}
