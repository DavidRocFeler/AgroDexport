import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService]
})
export class NotificationsModule {}
