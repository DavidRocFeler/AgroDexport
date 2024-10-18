import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CompanyProductsService } from './company-products.service';
import { CompanyProduct } from '@prisma/client'; 
import { ApiTags } from '@nestjs/swagger';

@ApiTags("products")
@Controller('company-products')
export class CompanyProductsController {
  constructor(private readonly companyProductsService: CompanyProductsService) {}

  @Get()
  async allCompanyProducts(): Promise<CompanyProduct[]> {
    return this.companyProductsService.findAllServices();
  }

  @Get('company/:id')
  async getAllMyCompanyProducts(@Param('id') companyId: string) {
    return await this.companyProductsService.findAllByCompanyIdServices(companyId);
  }


}
