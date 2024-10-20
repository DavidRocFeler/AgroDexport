import { Controller, Patch, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Patch(':id/read')
  async markAsRead(@Param('id') notificationId: string) {
    return this.notificationsService.markAsRead(notificationId);
  }
}
