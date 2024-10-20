import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyProduct, Prisma } from '@prisma/client'; 
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';
import { UpdateCompanyProductDto } from './dtos/update-company-product.dto';

@Injectable()
export class CompanyProductsRepository {
  
  
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CompanyProduct[]> {
    return this.prisma.companyProduct.findMany();
  }

  async findAllByCompanyId(companyId: string) {
    return this.prisma.companyProduct.findMany({
      where: { company_id: companyId },
    });
  }

  async findProductByIdRepository(companyId: string, productId: string) {
    const product = await this.prisma.companyProduct.findUnique({
      where: { company_id: companyId, company_product_id: productId },
    })

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found for company ${companyId}`);
    }
  
    return product;
  }


  async createProductRepository(createCompanyProductDto: CreateCompanyProductDto): Promise<CompanyProduct> {
   
        const harvest_date = new Date(createCompanyProductDto.harvest_date);

        if (isNaN(harvest_date.getTime())) {
            throw new Error('Invalid harvest date format. Please provide a valid ISO-8601 date string.');
        }

        return await this.prisma.companyProduct.create({
            data: {
                farmer_id: createCompanyProductDto.farmer_id,
                company_id: createCompanyProductDto.company_id,
                category_id: createCompanyProductDto.category_id,
                order_details_id: createCompanyProductDto.order_details_id,
                company_product_name: createCompanyProductDto.company_product_name,
                company_product_description: createCompanyProductDto.company_product_description,
                stock: createCompanyProductDto.stock,
                minimum_order: createCompanyProductDto.minimum_order,
                origin: createCompanyProductDto.origin,
                company_price_x_kg: createCompanyProductDto.company_price_x_kg,
                total_price: createCompanyProductDto.total_price,
                harvest_date,
                company_product_img: createCompanyProductDto.company_product_img,
                calories: createCompanyProductDto.calories,
                fat: createCompanyProductDto.fat,
                protein: createCompanyProductDto.protein,
                carbs: createCompanyProductDto.carbs,
            }
        });
    }

    async updateProductRepository(updateCompanyProductDto: UpdateCompanyProductDto, productId: string) {
      const product = await this.prisma.companyProduct.update({
        where: { company_product_id : productId },
        data: {...updateCompanyProductDto},
      })

      return product;
    }



  async findByProductName(productName: string): Promise<CompanyProduct | null> {
    return this.prisma.companyProduct.findFirst({
      where: {
        company_product_name: productName,
      },
    });
  }

  async findProductById(productId: string) {
    return this.prisma.companyProduct.findUnique({
      where: { company_product_id: productId},
      select: { isActive: true },
    });
  }

  async softDeleteProductRepository(productId: string) {
    const product = await this.prisma.companyProduct.findUnique({
      where: { company_product_id: productId},
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.companyProduct.update({
      where: { company_product_id: productId},
      data: { isActive: false },
    });
  }

}
