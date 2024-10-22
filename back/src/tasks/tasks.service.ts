import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class TasksService {
    constructor (
        private readonly usersRepository: UsersRepository,
        private readonly notificationsService:  NotificationsService
    ) {}


  @Cron(CronExpression.EVERY_WEEK)
  async remindIncompleteProfiles() {
    const incompleteUsers = await this.usersRepository.findUsersWithIncompleteProfiles();

    if (incompleteUsers.length === 0) {
        console.log('No se encontraron usuarios con perfil incompleto');
        return;
      }
  
      console.log(`Usuarios con perfil incompleto encontrados: ${incompleteUsers.length}`);
  
      for (const user of incompleteUsers) {
        await this.notificationsService.createAndNotifyUser(
          user.user_id,
          'Por favor, completa tu perfil en la plataforma.',
          'reminder'
        );
        console.log(`Notificación enviada a: ${user.user_name}`);
      }
  
      console.log('Notificaciones enviadas a todos los usuarios con perfil incompleto');
  }
}
