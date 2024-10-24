import { Module } from '@nestjs/common';
import { FarmerCertificationController } from './farmer-certifications.controller';
import { FarmerCertificationService } from './farmer-certifications.service';
import { FarmerCertificationRepository } from './farmer-certifications.repository';
import { CompanyProductsModule } from '../company-products/company-products.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [CompanyProductsModule, CompaniesModule],
  controllers: [FarmerCertificationController],
  providers: [FarmerCertificationService, FarmerCertificationRepository],
  exports: [FarmerCertificationRepository]
})
export class FarmerCertificationsModule {}
