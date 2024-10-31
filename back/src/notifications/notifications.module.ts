import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';
import { NotificationRepository } from './notifications.repository';

@Module({
  controllers:[NotificationsController],
  providers: [NotificationsService, NotificationsGateway, NotificationRepository],
  exports: [NotificationsService]
})
export class NotificationsModule {}
