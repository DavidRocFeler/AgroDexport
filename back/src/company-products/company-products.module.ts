import { Module } from '@nestjs/common';
import { CompanyProductsController } from './company-products.controller';
import { CompanyProductsService } from './company-products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyProductsRepository } from './company-products.repository';
import { CompanyService } from 'src/companies/companies.service';
import { CompaniesModule } from 'src/companies/companies.module';
import { UsersModule } from 'src/users/users.module';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoryRepository } from 'src/categories/categories.repository';

@Module({
  imports: [CompaniesModule, UsersModule, CategoriesModule],
  controllers: [CompanyProductsController],
  providers: [CompanyProductsService, CompanyProductsRepository, CompanyService, PrismaService, CategoryRepository]
})
export class CompanyProductsModule {}
