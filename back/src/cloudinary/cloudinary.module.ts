import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';
import { CompanyProductsModule } from '../company-products/company-products.module';

@Module({
  imports:[UsersModule, CompaniesModule, CompanyProductsModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig]
})
export class CloudinaryModule {}

