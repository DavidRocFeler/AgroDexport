import { Body, Controller, Post, Get, Param, Put, Delete, HttpCode, UseGuards, } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './createCompany.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDto } from './updateCompany.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/RolesGuard';

@ApiTags("companies")
@Controller('companies')
export class CompanyController {

    constructor(private readonly companyServices:CompanyService){}

    
    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin') 
    async getAllCompanies() {
    const companies = await this.companyServices.getAllCompaniesServices();
    return companies;
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
    @Roles('supplier', 'buyer')
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
    @Roles('supplier', 'buyer')
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

