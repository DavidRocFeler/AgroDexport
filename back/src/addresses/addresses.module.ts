import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { AddressesRepository } from './adresses.repository';
import { CompanyRepository } from '../companies/companies.repository';
import { CompaniesModule } from '../companies/companies.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, AddressesRepository],
  imports: [CompaniesModule, NotificationsModule],
  exports: [AddressesService]
})
export class AddressesModule {}
