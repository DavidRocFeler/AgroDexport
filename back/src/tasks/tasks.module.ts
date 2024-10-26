import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TasksRepository } from './tasks.repository';
import { EmailModule } from '../nodemail/nodemail.module';
import { CompanyProductsModule } from '../company-products/company-products.module';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule, NotificationsModule, EmailModule, CompanyProductsModule], 
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
