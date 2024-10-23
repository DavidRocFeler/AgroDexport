import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyProductsRepository } from './company-products.repository';
import { CompanyProduct } from '@prisma/client'; 
import { CompanyRepository } from '../companies/companies.repository';
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';
import { CategoryRepository } from '../categories/categories.repository';
import { UpdateCompanyProductDto } from './dtos/update-company-product.dto';
import * as companyProductsData from '../assets/company-products.json';

@Injectable()
export class CompanyProductsService {
  
  constructor(
    private readonly companyProductsRepository: CompanyProductsRepository, 
    private readonly companyRepository: CompanyRepository,
    private readonly categoryRepository: CategoryRepository,
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
  
  async findProductByIdServices(companyId: string, productId: string) {
    const existingCompany = await this.companyRepository.findById(companyId);
    
    if (!existingCompany){
      throw new NotFoundException("The company not found")
    }

    return this.companyProductsRepository.findProductByIdRepository(companyId, productId);

  }
 

  async createProductServices(createCompanyProductDto: CreateCompanyProductDto): Promise<CompanyProduct> {
    const existingCompany = await this.companyRepository.findById(createCompanyProductDto.company_id);
    const existingProduct = await this.companyProductsRepository.findByProductName(createCompanyProductDto.company_product_name);
    const existingCategory = await this. categoryRepository.findByIdcategory(createCompanyProductDto.category_id)
    
    
    if (existingCompany.user?.role?.role_name !== 'supplier') {
      throw new ForbiddenException('Only suppliers can create products.');
    }

    if (existingProduct && existingProduct.company.company_id === createCompanyProductDto.company_id) {
      throw new ConflictException('Product with this name already exists for this company.');
    }

    if (!existingCategory) {
      throw new NotFoundException('The category not found')
    }

    return this.companyProductsRepository.createProductRepository(createCompanyProductDto);
  }

  async updateProductServices(productId: string, productData: UpdateCompanyProductDto) {
    
    const existingProduct = await this.companyProductsRepository.findProductById(productId);  

    if (!existingProduct) {
      throw new NotFoundException('Product not found.');
    }

    if (existingProduct.isActive === false){
      throw new ConflictException('Product is not active')
    }

    return this.companyProductsRepository.updateProductRepository(productId, productData);
  }

  softDeleteProductServices(productId: string) {
  return this.companyProductsRepository.softDeleteProductRepository(productId);
  }

  async preloadCompanyProductsService(): Promise<{ companyProduct: string; status: string }[]> {
    const results: { companyProduct: string; status: string }[] = [];

    for (const companyProductData of companyProductsData) {
      const company = await this.companyRepository.findByName(companyProductData['company_name']);
      if (!company) {
          results.push({ companyProduct: companyProductData['company_name'], status: 'Company not found' });
          continue;
      }
      if (company.user.role.role_name !== 'supplier') {
          results.push({ companyProduct: companyProductData['company_product_name'], status: 'User is not a supplier' });
          continue;
      }
       
      const category = await this.categoryRepository.findCategoryByName(companyProductData['category_name']);

      if (!category) {
        results.push({ companyProduct: companyProductData['company_product_name'], status: 'Category not found' });
        continue;
      }

    const existingProduct = await this.companyProductsRepository.findByProductName(companyProductData['company_product_name']);

      if (existingProduct && existingProduct.company.company_name === companyProductData['company_name']) {
        results.push({ companyProduct: companyProductData['company_product_name'], status: 'Product already exists for this company' });
        continue;
      }

      const { company_name, category_name, ...companyProductWithoutExtra } = companyProductData;
      const companyProductFinal = { ...companyProductWithoutExtra, company_id: company.company_id, category_id: category.category_id, isActive: true, company_product_img: companyProductData['company_product_img'] };
      
      results.push({ companyProduct: companyProductData.company_product_name, status: 'Created' });

      await this.companyProductsRepository.createProductRepository(companyProductFinal);
    }
  return results;
}
}
