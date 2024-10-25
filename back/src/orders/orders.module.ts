import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repositiry';
import { CompaniesModule } from 'src/companies/companies.module';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { CompanyProductsRepository } from 'src/company-products/company-products.repository';
import { AddressesRepository } from 'src/addresses/adresses.repository';

@Module({
  imports: [CompaniesModule, UsersModule, CategoriesModule, NotificationsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, CompanyProductsRepository, AddressesRepository],
  exports: [OrderRepository, OrdersService]
})
export class OrdersModule {}
