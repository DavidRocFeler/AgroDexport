import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateNotificationToRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { notification_id: notificationId },
      data: { isRead: true },
    });
  }

  async findAllNotifications() {
    return this.prisma.notification.findMany(); // No filtra por user_id
  }


  async findNotificationById(notificationId: string) {
    return this.prisma.notification.findUnique({
      where: {
        notification_id: notificationId,
      },
    });
  }

  // Obtener notificaciones no leídas de un usuario
  async findUnreadNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        user_id: userId,
        isRead: false,
      },
    });
  }

  async findAllByUserId(userId: string): Promise<Notification[]> {
    console.log('Buscando notificaciones para user_id:', userId); // Verificar el valor de userId
    return this.prisma.notification.findMany({
      where: { user_id: userId },
    });
  }
  
}

