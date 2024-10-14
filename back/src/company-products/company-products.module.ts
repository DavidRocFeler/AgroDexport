import { Module } from '@nestjs/common';
import { CompanyProductsController } from './company-products.controller';
import { CompanyProductsService } from './company-products.service';

@Module({
  controllers: [CompanyProductsController],
  providers: [CompanyProductsService]
})
export class CompanyProductsModule {}
