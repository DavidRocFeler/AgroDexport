import { Module } from '@nestjs/common';
import { CompanyProductsController } from './company-products.controller';
import { CompanyProductsService } from './company-products.service';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyProductsRepository } from './company-products.repository';
import { CompanyService } from '../companies/companies.service';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesModule } from '../categories/categories.module';
import { CategoryRepository } from '../categories/categories.repository';

@Module({
  imports: [CompaniesModule, UsersModule, CategoriesModule],
  controllers: [CompanyProductsController],
  providers: [CompanyProductsService, CompanyProductsRepository, CompanyService, CategoryRepository],
  exports: [CompanyProductsRepository, CompanyProductsService]
})
export class CompanyProductsModule {}
