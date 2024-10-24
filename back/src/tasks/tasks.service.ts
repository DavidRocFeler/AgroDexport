import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersRepository } from '../users/users.repository';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
    constructor (
        private readonly usersRepository: UsersRepository,
        private readonly notificationsService:  NotificationsService,
        private readonly tasksRepository: TasksRepository
    ) {}


    @Cron(CronExpression.EVERY_2_HOURS)
    async remindIncompleteProfiles() {
        const taskData: CreateTaskDto = {
            task_name: 'Reminder for Incomplete Profiles',
            task_status: 'pending',
            task_message: 'Send reminders to users with incomplete profiles.',
            nextRun_date: new Date(Date.now() + 7200000) 
        };
    
        const savedTask = await this.tasksRepository.createTask(taskData);

        const incompleteUsers = await this.usersRepository.findUsersWithIncompleteProfiles();
    
        if (incompleteUsers.length === 0) {
            console.log('No se encontraron usuarios con perfil incompleto');
            return;
        }
    
        console.log(`Usuarios con perfil incompleto encontrados: ${incompleteUsers.length}`);
    
        for (const user of incompleteUsers) {
            await this.notificationsService.createAndNotifyUser(
                user.user_id,
                'Please complete your profile on the platform.',
                'reminder',
                savedTask.task_id
            );
        }
    }  
}
