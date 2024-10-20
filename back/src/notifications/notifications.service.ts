import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsGateway: NotificationsGateway
  ) {}


  async createAndNotifyUser(userId: string, message: string, type: string) {
    const prisma = new PrismaClient();

    const notificationData: Prisma.NotificationUncheckedCreateInput = {
      user_id: userId,
      message,
      type,
      notification_date: new Date(),
      isRead: false,
    };
  
    const notification = await prisma.notification.create({
      data: notificationData,
    });
  
    this.notificationsGateway.sendNotification(userId, notification);
  
    return notification;
  }
  
}
