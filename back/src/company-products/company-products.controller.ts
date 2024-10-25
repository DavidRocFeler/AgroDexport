import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CompanyProductsService } from './company-products.service';
import { CompanyProduct } from '@prisma/client'; 
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';
import { UpdateCompanyProductDto } from './dtos/update-company-product.dto';
import { RolesGuard } from 'src/guards/RolesGuard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';


@ApiBearerAuth()
@ApiTags("products")
@Controller('company-products')
export class CompanyProductsController {
  constructor(private readonly companyProductsService: CompanyProductsService) {}

  @Get()
  async allCompanyProducts(): Promise<CompanyProduct[]> {
    return this.companyProductsService.findAllServices();
  }


  @Get('company/:id')
  async getAllMyCompanyProducts(@Param('id') companyId: string) {
    return await this.companyProductsService.findAllByCompanyIdServices(companyId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier') 
  @Get("company/:companyId/product/:productId")
  async getProductById(@Param('companyId') companyId: string, @Param('productId') productId: string) {
    return await this.companyProductsService.findProductByIdServices(companyId, productId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier') 
  @Post()
  async create(@Body() createCompanyProductDto: CreateCompanyProductDto) {
      return this.companyProductsService.createProductServices(createCompanyProductDto);
  }
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier') 
  @Put(":id")
  async updateProduct(@Param("id") productId: string, @Body() productData: UpdateCompanyProductDto){
    return this.companyProductsService.updateProductServices(productId, productData) 
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier') 
  @Delete(":id")
  async softDeleteProduct(@Param("id") productId: string){
    return this.companyProductsService.softDeleteProductServices(productId)
  }

  @ApiExcludeEndpoint()
  @Post("sedeer")
  async preloadCategories(@Body() companyProductData: CreateCompanyProductDto){
      return this.companyProductsService.preloadCompanyProductsService();
  }

}
