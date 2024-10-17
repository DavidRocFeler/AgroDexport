import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompanyService } from './companies.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompanyService, PrismaService]
})
export class CompaniesModule {}
