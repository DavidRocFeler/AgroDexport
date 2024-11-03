import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './createCompany.dto';
import { UpdateCompanyDto } from './updateCompany.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyRepository {
  

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService) {}

    async getAll(): Promise<any[]> {
      return this.prisma.company.findMany({
        include: {
          user: {
            select: {
              role: {
                select: {
                  role_name: true, 
                },
              },
            },
          },
          shippingAddress: true, 
        },
      });
    }
    
    
    
  
    async getWithFilters(filters: any[]): Promise<Company[]> {
      return this.prisma.company.findMany({
        where: {
          OR: [
            { isActive: true },
            { isActive: false },
          ],
          AND: filters,
        },
      });
    }
    

  async findById(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId },
      include: {
        user: {
          include: {
            role: true, 
          },
        },
      },
    });

    if (!company || !company.isActive) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async findByName(companyName: string) {
    if (!companyName) {
      throw new Error("El nombre de la compañía no puede ser vacío");
    }
    
    const company = await this.prisma.company.findUnique({
      where: {
        company_name: companyName,
      },
      include: {
        user: {
          include: {
            role: true
          }
        }
      }
    });
    
    return company;
  }
  
  async findCompaniesByUserId(userId: string) {
    return this.prisma.company.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async getAccountPaypalByUserIdRepository(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId }
    });

    if (!company || !company.isActive) {
      return { error: 'Company not found ', statusCode: 404 };
    }

    
    return { account_paypal: company.account_paypal, statusCode: 200 };
  }
  

  async create(companyData: CreateCompanyDto) {
    if (companyData.tax_identification_number && companyData.country) {
        const existingCompany = await this.prisma.company.findFirst({
            where: {
                tax_identification_number: companyData.tax_identification_number,
                country: companyData.country,
                isActive: true,
            },
        });

        if (existingCompany) {
            throw new ConflictException('A company with this tax identification number already exists in the same country.');
        }
    }

    const company = await this.prisma.company.create({
        data: {
            ...companyData,
            isActive: true,
            account_paypal: companyData.account_paypal || 'ATUWOIjpu_gq_k6k28V2zGm2DRCGdv_5PfrJ_J1H38xze2IGLtMXhDMUJWLqsYwAqSxfJkyzqODmKBCx',
            company_logo: companyData.company_logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYc3Fkk0tLl5MMO0rUaiO5qUfdLzbaPhb07g&s',
        },
    });

    // Notificación para usuarios admin
    await this.notificationsService.createAndNotifyUsers(
        'admin',
        `New company created: ${company.company_name}`,
        'company_created',
    );

    return company;
}

  async update(companyId: string, companyData: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (!company.isActive) {
      throw new NotFoundException('Company is inactive');
    }

    return await this.prisma.company.update({
      where: { company_id: companyId },
      data: companyData,
    });
  }

  async softDelete(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.company.update({
      where: { company_id: companyId },
      data: { isActive: false },
    });
  }

  async findByAcoountPaypalById(company_supplier_id: string) {
    const accountPaypal = await this.prisma.company.findUnique({
      where: { company_id: company_supplier_id },
      select: { account_paypal: true },
    });
    return accountPaypal?.account_paypal;
  }
}
