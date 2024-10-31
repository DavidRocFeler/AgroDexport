import { Body, Controller, Post, Get, Param, Put, Delete, HttpCode, UseGuards, Query, } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './createCompany.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDto } from './updateCompany.dto';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/RolesGuard';

@ApiTags("companies")
@Controller('companies')
export class CompanyController {

    constructor(private readonly companyServices:CompanyService){}

    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiQuery({ name: 'name', required: false, description: 'Company name' })
    @ApiQuery({ name: 'country', required: false, description: 'Country' })
    @ApiQuery({ name: 'isActive', required: false, enum: ['true', 'false'], description: 'Is active (true/false)' })
    @ApiQuery({ name: 'industry', required: false, description: 'Industry' })
    @ApiQuery({ name: 'city', required: false, description: 'City' })
    @ApiQuery({ name: 'state', required: false, description: 'State' })
    async getAllCompanies(
      @Query('name') company_name?: string,
      @Query('country') country?: string,
      @Query('isActive') isActive?: string,
      @Query('industry') industry?: string,
      @Query('city') city?: string,
      @Query('state') state?: string,
    ) {
      const filters = [];
  
      if (company_name) {
        filters.push({ company_name: { contains: company_name, mode: 'insensitive' } });
      }
  
      if (country) {
        filters.push({ country: { contains: country, mode: 'insensitive' } });
      }
  
      if (isActive !== undefined) {
        const isActiveBoolean = isActive === 'true'; 
        filters.push({ isActive: isActiveBoolean });
      }
  
      if (industry) {
        filters.push({ industry: { contains: industry, mode: 'insensitive' } });
      }
  
      if (city) {
        filters.push({ city: { contains: city, mode: 'insensitive' } });
      }
  
      if (state) {
        filters.push({ state: { contains: state, mode: 'insensitive' } });
      }
  
      if (filters.length === 0) {
        return this.companyServices.getAllCompaniesService();
      }
  
      return this.companyServices.getCompaniesWithFilters(filters);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id') 
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier', 'buyer') 
    async getCompanyById(@Param('id') companyId: string) {
    const company = await this.companyServices.getCompanyByIdServices(companyId);
    return company;
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier', 'buyer')
    async createCompany(@Body() companyData: CreateCompanyDto) {
    const newCompany = await this.companyServices.createCompanyServices(companyData);
    return {
        message: 'Company created successfully',
        data: newCompany,
      };
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id') 
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier', 'buyer')
    async updateCompany(@Param('id') companyId: string, @Body()companyData: UpdateCompanyDto) {
    const updatedCompany = await this.companyServices.updateCompanyServices(companyId, companyData);
    return updatedCompany;
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier', 'buyer') 
  async softDeleteCompany(@Param('id') companyId: string) {
    const deletedCompany = await this.companyServices.softDeleteCompanyServices(companyId);
    return {
      message: 'Company deleted successfully (soft delete)',
      data: deletedCompany,
    };
  }

  @Post("sedeer")
  @ApiExcludeEndpoint()
  async preloadUsers(@Body() companyData: CreateCompanyDto){
      return this.companyServices.preloadCompaniesService();
  }
}

