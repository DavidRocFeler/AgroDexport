import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TasksRepository } from './tasks.repository';
import { EmailModule } from '../nodemail/nodemail.module';
import { CompanyProductsModule } from '../company-products/company-products.module';
import { CompaniesModule } from '../companies/companies.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule, NotificationsModule, EmailModule, CompanyProductsModule, CompaniesModule, OrdersModule], 
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
