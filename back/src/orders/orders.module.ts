import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repositiry';
import { CompaniesModule } from 'src/companies/companies.module';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { CompanyProductsRepository } from '../company-products/company-products.repository';
import { AddressesRepository } from '../addresses/adresses.repository';
import { EmailModule } from '../nodemail/nodemail.module';

@Module({
  imports: [CompaniesModule, UsersModule, CategoriesModule, NotificationsModule, EmailModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, CompanyProductsRepository, AddressesRepository],
  exports: [OrderRepository, OrdersService]
})
export class OrdersModule {}
