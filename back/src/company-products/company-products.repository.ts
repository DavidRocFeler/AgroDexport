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
    const { harvest_date, ...rest } = createCompanyProductDto;
    const parsedHarvestDate = new Date(harvest_date);
  
    if (isNaN(parsedHarvestDate.getTime())) {
      throw new Error('Invalid harvest date format. Please provide a valid ISO-8601 date string.');
    }
  
    return await this.prisma.companyProduct.create({
      data: {
        ...rest,
        harvest_date: parsedHarvestDate,
      },
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
    const product = await this.prisma.companyProduct.findFirst({
      where: {
        company_product_name: productName,
      },
      include: {
        company: true,
      },
    });

    return product
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
