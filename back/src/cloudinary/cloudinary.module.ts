import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';
import { CompanyProductsModule } from '../company-products/company-products.module';
import { FarmerCertificationsModule } from '../farmer-certifications/farmer-certifications.module';

@Module({
  imports:[UsersModule, CompaniesModule, CompanyProductsModule, FarmerCertificationsModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig]
})
export class CloudinaryModule {}

