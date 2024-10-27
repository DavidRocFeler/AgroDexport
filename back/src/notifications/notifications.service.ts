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


  async createAndNotifyUser(userId: string, message: string, type: string, taskId?: string) {

    const existingNotification = await this.prisma.notification.findFirst({
        where: {
            user_id: userId,
            message: message,
            isRead: false,
        },
    });

    if (existingNotification) {
        // console.log(`Notification not sent to ${userId}: an unread notification with the same message already exists.`);
        return {
            success: false,
            message: 'No new notification was sent: an unread notification with the same message already exists.'
        };
    }

    const notificationData: Prisma.NotificationUncheckedCreateInput = {
        user_id: userId,
        message,
        type,
        notification_date: new Date(),
        isRead: false,
        task_id: taskId,
    };

    const notification = await this.prisma.notification.create({
        data: notificationData,
    });

    this.notificationsGateway.sendNotification(userId, notification);
    console.log("Se envio una notificación")

    return {
        success: true,
        message: 'Notification sent successfully.',
        notification, 
    };
}


 
async createAndNotifyUsers(roleName: string, message: string, type: string) {
  const users = await this.prisma.user.findMany({
    where: { role: { role_name: roleName } },
  });

  const notifications = await Promise.all(
    users.map(async (user) => {
      const existingNotification = await this.prisma.notification.findFirst({
        where: {
          user_id: user.user_id,
          message: message,
          isRead: false,
        },
      });

      if (existingNotification) {
        console.log(`Notification not sent to ${user.user_id}: an unread notification with the same message for admins already exists.`);
        return null;
      }

      const notificationData: Prisma.NotificationUncheckedCreateInput = {
        user_id: user.user_id,
        message,
        type,
        notification_date: new Date(),
        isRead: false,
      };

      const notification = await this.prisma.notification.create({
        data: notificationData,
      });
      this.notificationsGateway.sendNotification(user.user_id, notification);

      return notification;
    })
  );

  return notifications.filter((notification) => notification !== null);
}
  

async createAndNotifyBuyers(message: string, type: string) {
  const buyerUsers = await this.prisma.user.findMany({
    where: { role: { role_name: 'buyer' } },
  });

  const notifications = await Promise.all(
    buyerUsers.map(async (buyer) => {
      const existingNotification = await this.prisma.notification.findFirst({
        where: {
          user_id: buyer.user_id,
          message: message,
          isRead: false,
        },
      });

      if (existingNotification) {
        // console.log(`Notification not sent to ${buyer.user_id}: an unread notification with the same message for buyers already exists.`);
        return null;
      }

      const notificationData: Prisma.NotificationUncheckedCreateInput = {
        user_id: buyer.user_id,
        message,
        type,
        notification_date: new Date(),
        isRead: false,
      };

      const notification = await this.prisma.notification.create({
        data: notificationData,
      });
      this.notificationsGateway.sendNotification(buyer.user_id, notification);

      return notification;
    })
  );

  return notifications.filter((notification) => notification !== null);
}


  
  
  async markAsRead(notificationId: string) {
    const notification = await this.prisma.notification.update({
      where: { notification_id: notificationId },
      data: { isRead: true },
    });
  
    return notification;
  }
  
}
