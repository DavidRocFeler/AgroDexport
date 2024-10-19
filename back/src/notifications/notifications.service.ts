import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';
import { UsersRepository } from '../users/users.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly usersRepository: UsersRepository
  ) {}


  async createAndNotifyUser(userId: string, message: string) {

    const notification = await this.prisma.notification.create({
        data: {
          user_id: userId,
          message,
          type: 'UserUpdate',
          notification_date: new Date(),
          isRead: false,
        } as Prisma.NotificationUncheckedCreateInput, 
      });

    this.notificationsGateway.sendNotification(userId, notification);

    return notification;
  }
}
