import { Module } from '@nestjs/common';
import { CompanyProductsController } from './company-products.controller';
import { CompanyProductsService } from './company-products.service';
import { CompanyProductsRepository } from './company-products.repository';
import { CompanyService } from '../companies/companies.service';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesModule } from '../categories/categories.module';
import { CategoryRepository } from '../categories/categories.repository';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [CompaniesModule, UsersModule, CategoriesModule, NotificationsModule],
  controllers: [CompanyProductsController],
  providers: [CompanyProductsService, CompanyProductsRepository, CompanyService, CategoryRepository],
  exports: [CompanyProductsRepository]
})
export class CompanyProductsModule {}
