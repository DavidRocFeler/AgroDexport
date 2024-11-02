import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Company, CompanyProduct, Prisma } from '@prisma/client'; 
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';
import { UpdateCompanyProductDto } from './dtos/update-company-product.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CompanyProductsRepository {
   
    
  constructor(private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService
  ) {}

  async findAll(): Promise<CompanyProduct[]> {
    return this.prisma.companyProduct.findMany({
      include: {
        farmerCertification: true, 
        category: true,
        company: {  
          select: {
            company_name: true,  
          },
        },
      },
    });
  }

  async findAllWithFilters(filters: any): Promise<CompanyProduct[]> {
    return this.prisma.companyProduct.findMany({
      where: {
        ...filters,
        ...(filters.category && {
          category: {
            is: {
              name_category: {
                contains: filters.category.name_category,
                mode: 'insensitive',
              },
            },
          },
        }),
        ...(filters.company && {
          company: {
            is: {
              company_name: {
                contains: filters.company.company_name,
                mode: 'insensitive',
              },
            },
          },
        }),
      },
      include: {
        farmerCertification: true,
        category: true,
        company: true,
      },
    });
  }
  
  




  async findProductsWithoutFarmer(): Promise<any[]> {
    return this.prisma.companyProduct.findMany({
      where: { farmer_id: null },
      include: {
        company: {
          include: {
            user: {
              include: {
                credential: true,
              },
            },
          },
        },
      },
    });
  }


  async findProductsWithIncompleteCertifications(): Promise<any[]> {
    return this.prisma.companyProduct.findMany({
      where: {
        farmer_id: { not: null },
        farmerCertification: {
          OR: [
            { phytosanitary_certificate: null },
            { agricultural_producer_cert: null },
            { organic_certification: null },
            { quality_certificate: null },
            { certificate_of_origin: null },
          ],
        },
      },
      include: {
        farmerCertification: true,
        company: {
          include: {
            user: {
              include: {
                credential: true,
              },
            },
          },
        },
      },
    });
  }
 
  async findAllByCompanyId(companyId: string) {
    return this.prisma.companyProduct.findMany({
      where: { company_id: companyId },
      include: {
        category: true, 
      },
    });
  }
  

  async findProductByIdRepository(companyId: string, productId: string) {
    const product = await this.prisma.companyProduct.findUnique({
        where: { 
            company_id: companyId, 
            company_product_id: productId 
        },
        include: { 
            farmerCertification: true, 
        },
    });

    if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found for company ${companyId}`);
    }
  
    return product;
}



  async createProductRepository(createCompanyProductDto: CreateCompanyProductDto): Promise<CompanyProduct> {
    const { harvest_date, ...rest } = createCompanyProductDto;
    const parsedHarvestDate = new Date(harvest_date);

    const totalPrice = (createCompanyProductDto.minimum_order * 1000 ) * createCompanyProductDto.company_price_x_kg;
    const discountPrice = totalPrice * ((100-createCompanyProductDto.discount)/100);

    const roundedDiscountPrice = parseFloat(discountPrice.toFixed(2));
  
    if (isNaN(parsedHarvestDate.getTime())) {
      throw new Error('Invalid harvest date format. Please provide a valid ISO-8601 date string.');
    }
  
    const product = await this.prisma.companyProduct.create({
      data: {
        ...rest,
        harvest_date: parsedHarvestDate,
        total_price: roundedDiscountPrice,
      },
    });

    const company = await this.findByProductNameAndCompanyId(product.company_product_name, product.company_id);

    await this.notificationsService.createAndNotifyUsers(
      'buyer',
      `Company ${company.company.company_name} added the followind Product: ${product.company_product_name}`,
      'product_created'
    );

    return product;
  }
  
  async updateProductRepository(productId: string, productData: UpdateCompanyProductDto) {
    const { harvest_date, ...rest } = productData;
    
    let parsedHarvestDate;
    if (harvest_date) {
      parsedHarvestDate = new Date(harvest_date);
      if (isNaN(parsedHarvestDate.getTime())) {
        throw new Error('Invalid harvest date format. Please provide a valid ISO-8601 date string.');
      }
    }
  
    return await this.prisma.companyProduct.update({
      where: { company_product_id: productId },
      data: {
        ...rest,
        harvest_date: parsedHarvestDate, // solo se asigna si harvest_date fue proporcionado
      },
    });
  }
  

    async findByProductNameAndCompanyId(productName: string, companyId: string): Promise<(CompanyProduct & { company: Company }) | null> {
      const product = await this.prisma.companyProduct.findFirst({
        where: {
          company_product_name: productName,
          company_id: companyId,
        },
        include: {
          company: true,
        },
      });
    
      return product;
    }
    

  async findProductById(productId: string) {
    return this.prisma.companyProduct.findUnique({
      where: { company_product_id: productId},
      select: { isActive: true },
    });
  }

  async findProductsByIds(companyproductsIds: string[]): Promise<CompanyProduct[]> {
    return this.prisma.companyProduct.findMany({
        where: {
            company_product_id: {
                in: companyproductsIds, 
            },
        },
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

  async findByIdMinimumOrder(product_one_id: string) {
    const product = await this.prisma.companyProduct.findUnique({
      where: { company_product_id: product_one_id},
      select: { minimum_order: true },
    });

    return product?.minimum_order;
  }

    async findByIdStock(product_one_id: string) {
      const product = await this.prisma.companyProduct.findUnique({
        where: { company_product_id: product_one_id},
        select: { stock: true },
      });
  
      return product?.stock
    }
}
