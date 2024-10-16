import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCompaniesServices() {
    return await this.prisma.company.findMany({
      where: { isActive: true }, 
    });
  }

  async getCompanyByIdServices(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId }, 
    });
  
    if (!company || !company.isActive) {
      throw new NotFoundException('Company not found');
    }
  
    return company;
  }
  


  async createCompanyServices(companyData: CreateCompanyDto) {
    
    const userExists = await this.prisma.user.findUnique({
        where: { user_id: companyData.user_id },
      });
  
      if (!userExists) {
        throw new NotFoundException('User not found. Please provide a valid user ID.');
      }

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

    const newCompany = await this.prisma.company.create({
      data: {
        user_id: companyData.user_id,
        company_name: companyData.company_name,
        tax_identification_number: companyData.tax_identification_number,
        address: companyData.address,
        postal_code: companyData.postal_code,
        city: companyData.city,
        state: companyData.state,
        country: companyData.country,
        industry: companyData.industry,
        website: companyData.website,
        account_paypal: companyData.account_paypal,
        company_description: companyData.company_description,
        company_logo: companyData.company_logo,
        isActive: true,
      },
    });

    return newCompany;
  }

  async updateCompanyServices(companyId: string, companyData: CreateCompanyDto) {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId },
    });
  
    if (!company) {
      throw new NotFoundException('Company not found');
    }
  
    const updatedCompany = await this.prisma.company.update({
      where: { company_id: companyId },
      data: companyData,
    });
  
    return updatedCompany;
  }

  async softDeleteCompanyServices(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const deletedCompany = await this.prisma.company.update({
      where: { company_id: companyId },
      data: { isActive: false },
    });

    return deletedCompany;
  }
  
  


}





