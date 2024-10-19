import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { AddressesRepository } from './adresses.repository';
import { CompanyRepository } from '../companies/companies.repository';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, AddressesRepository],
  imports: [CompaniesModule],
  exports: [AddressesService]
})
export class AddressesModule {}
