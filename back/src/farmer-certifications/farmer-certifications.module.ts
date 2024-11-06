import { Module } from '@nestjs/common';
import { FarmerCertificationController } from './farmer-certifications.controller';
import { FarmerCertificationService } from './farmer-certifications.service';
import { FarmerCertificationRepository } from './farmer-certifications.repository';
import { CompanyProductsModule } from '../company-products/company-products.module';
import { CompaniesModule } from '../companies/companies.module';
import { OrderRepository } from 'src/orders/orders.repositiry';
import { OrdersModule } from 'src/orders/orders.module';
import { AddressesRepository } from 'src/addresses/adresses.repository';
import { NotificationsService } from 'src/notifications/notifications.service';
import { EmailService } from 'src/nodemail/nodemail.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationRepository } from 'src/notifications/notifications.repository';

@Module({
  imports: [CompanyProductsModule, CompaniesModule, OrdersModule, NotificationsModule  ],
  controllers: [FarmerCertificationController],
  providers: [FarmerCertificationService, FarmerCertificationRepository, OrderRepository, AddressesRepository, NotificationsService, EmailService, NotificationsService, NotificationRepository],
  exports: [FarmerCertificationRepository]
})
export class FarmerCertificationsModule {}
