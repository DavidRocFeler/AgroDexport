import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyProduct, Prisma } from '@prisma/client'; 
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';

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


  async create(createCompanyProductDto: CreateCompanyProductDto) {
    try {
      const createdProduct = await this.prisma.companyProduct.create({
        data: createCompanyProductDto,
      });
      return createdProduct;
    } catch (error) {
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        
        throw new Error(`Error en la base de datos: ${error.message}`);
      } else {
        throw new Error('Error al crear el producto de la compañía');
      }
    }
  }

}
