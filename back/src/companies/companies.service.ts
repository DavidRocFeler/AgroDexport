import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './createCompany.dto';
import * as companiesData from '../assets/companies.json';
import { UsersRepository } from '../users/users.repository';
import { UpdateCompanyDto } from './updateCompany.dto';
import { CompanyRepository } from './companies.repository';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly prisma: PrismaService) {}

    async getAllCompaniesService(): Promise<Company[]> {
      return this.companyRepository.getAll();
    }
  
    async getCompaniesWithFilters(filters: any[]): Promise<Company[]> {
      return this.companyRepository.getWithFilters(filters);
    }
  
    async getCompanyByIdServices(companyId: string) {
      return this.companyRepository.findById(companyId);
    }

    async getCompaniesByUserId(userId: string) {
      return this.companyRepository.findCompaniesByUserId(userId);
    }

    async getAccountPaypalByUserIdServices(companyId: string) {
      return this.companyRepository.getAccountPaypalByUserIdRepository(companyId);
    }
  
    async createCompanyServices(companyData: CreateCompanyDto) {
      const userExists = await this.usersRepository.getUserById(companyData.user_id);
      
      if (!userExists) {
        throw new NotFoundException('User not found. Please provide a valid user ID.');
      }
      const companyName = await this.companyRepository.findByName(companyData.company_name);
      if (companyName) {
        throw new BadRequestException("A company with the same name already exists");
    }
  
      return this.companyRepository.create(companyData);
    }
  
    async updateCompanyServices(companyId: string, companyData: UpdateCompanyDto) {
      return this.companyRepository.update(companyId, companyData);
    }
  
    async softDeleteCompanyServices(companyId: string) {
      return this.companyRepository.softDelete(companyId);
    }

  async preloadCompaniesService(): Promise<{ company: string; status: string }[]> {
    const results: { company: string; status: string }[] = [];
  
    for (const companyData of companiesData) {
      const user = await this.usersRepository.findUserByEmail(companyData['email']);
  
      if (!user) {
        results.push({ company: companyData.email, status: `Email ${companyData['email']} not found` });
        continue;
      }
  
      const existingCompany = await this.prisma.company.findFirst({
        where: {
          tax_identification_number: companyData.tax_identification_number,
          country: companyData.country,
          isActive: true,
        },
      });
  
      if (existingCompany) {
        results.push({ company: companyData.company_name, status: 'Already Exists' });
        continue;
      }
      const { email, ...companyWithoutEmail } = companyData;
      const companyWithUserId = { ...companyWithoutEmail, user_id: user.user_id };
  
      await this.prisma.company.create({
        data: companyWithUserId,
      });
  
      results.push({ company: companyData.company_name, status: 'Created' });
    }
  
    return results;
  }
  
}





