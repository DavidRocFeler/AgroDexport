import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyProductsRepository } from './company-products.repository';
import { CompanyProduct } from '@prisma/client'; 
import { CompanyRepository } from 'src/companies/companies.repository';

@Injectable()
export class CompanyProductsService {
    constructor(
        private readonly companyProductsRepository: CompanyProductsRepository, 
        private readonly companyRepository: CompanyRepository
      ) {}

  async findAllServices(): Promise<CompanyProduct[]> {
    return this.companyProductsRepository.findAll();
  }

  async findAllByCompanyIdServices(companyId: string) {
    
    await this.companyRepository.findById(companyId);
  
    const products = await this.companyProductsRepository.findAllByCompanyId(companyId);
  
    if (!products || products.length === 0) {
      throw new NotFoundException(`No products found for company ID: ${companyId}`);
    }
  
    return products;
  }

}
