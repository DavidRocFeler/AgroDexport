import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './createCompany.dto';
import { UpdateCompanyDto } from './updateCompany.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CompanyRepository {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService) {}

  async findAllActive() {
    return this.prisma.company.findMany({
      where: { isActive: true },
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
    const company = await this.prisma.company.findFirst({
      where: { company_name: companyName },
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
  

  async create(companyData: CreateCompanyDto) {
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

    
    const company = await this.prisma.company.create({
      data: { ...companyData, isActive: true }
    });

    await this.notificationsService.createAndNotifyAdmins(
      `Nueva compañía creada: ${company.company_name}`,
      'company_created'
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

    return this.prisma.company.update({
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
}
