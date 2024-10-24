import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule, NotificationsModule], 
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
