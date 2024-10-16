import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './createCompany.dto';

@Controller('companies')
export class CompanyController {

    constructor(private readonly companyServices:CompanyService){}

    @Get()
    async getAllCompanies() {
    const companies = await this.companyServices.getAllCompaniesServices();
    return companies;
    }

    @Get(':id') 
    async getCompanyById(@Param('id') companyId: string) {
    const company = await this.companyServices.getCompanyByIdServices(companyId);
    return company;
    }

    @Post()
    async createCompany(@Body() companyData: CreateCompanyDto) {
    const newCompany = await this.companyServices.createCompanyServices(companyData);
    return {
        message: 'Company created successfully',
        data: newCompany,
      };
    }

    @Put(':id') // Este endpoint actualizará la compañía específica por ID
    async updateCompany(
    @Param('id') companyId: string,
    @Body() companyData: CreateCompanyDto,
    ) {
    const updatedCompany = await this.companyServices.updateCompanyServices(companyId, companyData);
    return updatedCompany;
    }

}
