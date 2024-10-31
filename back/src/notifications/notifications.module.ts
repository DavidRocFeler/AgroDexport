import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';

@Module({
  controllers:[NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService]
})
export class NotificationsModule {}
