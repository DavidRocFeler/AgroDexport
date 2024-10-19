import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
// import { PrismaService } from '../prisma/prisma.service'; // Importar el servicio Prisma
// import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  // imports: [NotificationsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository]
})
export class UsersModule {}
