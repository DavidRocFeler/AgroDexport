import { Module } from '@nestjs/common';
import { CompanyProductsController } from './company-products.controller';
import { CompanyProductsService } from './company-products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyProductsRepository } from './company-products.repository';
import { CompanyService } from 'src/companies/companies.service';
import { CompaniesModule } from 'src/companies/companies.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [CompaniesModule, UsersModule],
  controllers: [CompanyProductsController],
  providers: [CompanyProductsService, CompanyProductsRepository, CompanyService, PrismaService]
})
export class CompanyProductsModule {}
