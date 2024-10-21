import { Module } from '@nestjs/common';
import { CompanyController } from './companies.controller';
import { CompanyService } from './companies.service';
import { CompanyRepository } from './companies.repository';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  imports: [UsersModule, NotificationsModule],
  exports: [CompanyService, CompanyRepository],
})
export class CompaniesModule {}
