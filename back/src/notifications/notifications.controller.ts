import { Controller, Get, Patch, Param, HttpCode, UseGuards, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/RolesGuard';
import { Roles } from '../decorators/roles.decorator';

@ApiTags("Notifications")
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier', 'buyer')
  @Put(':id/read')
  async markAsRead(@Param('id') notificationId: string) {
    console.log("se actualizo el estado de una notificación")
    return this.notificationsService.markAsRead(notificationId);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier', 'buyer')
  @Get('all')
  async getAllNotifications() {
    return this.notificationsService.getAllNotifications();
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier', 'buyer')
  @Get(':id')
  async getNotificationById(@Param('id') notificationId: string) {
    return this.notificationsService.getNotificationById(notificationId);
  }
  
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier', 'buyer')
  @Get('all/:userId')
  async getAllUserNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getAllUserNotifications(userId);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier', 'buyer')
  @Get('unread/:userId')
  async getUnreadNotifications(@Param('userId') userId: string) {
    if (!userId) {
      throw new Error('El userId es indefinido');
    }
    return this.notificationsService.getUnreadNotifications(userId);
  }

}
