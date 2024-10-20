import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyProductsRepository } from './company-products.repository';
import { CompanyProduct } from '@prisma/client'; 
import { CompanyRepository } from 'src/companies/companies.repository';
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';
import { CategoryRepository } from 'src/categories/categories.repository';
import { UpdateCompanyProductDto } from './dtos/update-company-product.dto';

@Injectable()
export class CompanyProductsService {
  
  constructor(
    private readonly companyProductsRepository: CompanyProductsRepository, 
    private readonly companyRepository: CompanyRepository,
    private readonly categoryRepositorio: CategoryRepository,
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
    const existingConpany = await this.companyRepository.findById(createCompanyProductDto.company_id);
    const existingProduct = await this.companyProductsRepository.findByProductName(createCompanyProductDto.company_product_name);
    const existingCategory = await this. categoryRepositorio.findByIdcategory(createCompanyProductDto.category_id)
    const verifyTotalPrice = (createCompanyProductDto.minimum_order * 1000 ) * createCompanyProductDto.company_price_x_kg; 
    
    if(!createCompanyProductDto.farmer_id){
      createCompanyProductDto.farmer_id = null;      
    }else{
      throw new ConflictException("The method not created for farmerId") 
    }

    if (!existingConpany){
      throw new NotFoundException("The company not found")
    }

    if (existingProduct) {
      throw new ConflictException('Product with this name already exists.');
    }

    if (!existingCategory) {
      throw new NotFoundException('The category not found')
    }

    if(!createCompanyProductDto.order_details_id){
      createCompanyProductDto.order_details_id = null;      
    }else{
      throw new ConflictException("The method not created for OrderDetailsId") 
    }


    if (createCompanyProductDto.total_price != verifyTotalPrice) {
      throw new ConflictException('The total price is not equal to the minimum order price')
    }

    return this.companyProductsRepository.createProductRepository(createCompanyProductDto);
  }

  async updateProductServices(productId: string, updateCompanyProductDto: UpdateCompanyProductDto) {
    
    const existingProduct = await this.companyProductsRepository.findProductById(productId);  

    if (!existingProduct) {
      throw new NotFoundException('Product not found.');
    }

    if (existingProduct.isActive === false){
      throw new ConflictException('Product is not active')
    }

    return this.companyProductsRepository.updateProductRepository(updateCompanyProductDto, productId);
  }

  softDeleteProductServices(productId: string) {
  return this.companyProductsRepository.softDeleteProductRepository(productId);
  }

}
