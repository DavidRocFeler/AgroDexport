import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CompanyProductsService } from './company-products.service';
import { CompanyProduct } from '@prisma/client'; 
import { ApiBearerAuth, ApiExcludeEndpoint, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';
import { UpdateCompanyProductDto } from './dtos/update-company-product.dto';
import { RolesGuard } from 'src/guards/RolesGuard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { contains } from 'class-validator';



@ApiTags("products")
@Controller('company-products')
export class CompanyProductsController {
  constructor(private readonly companyProductsService: CompanyProductsService) {}

  @Get()
  @ApiQuery({ name: 'category', required: false, description: 'Category of the product', type: String })
  @ApiQuery({ name: 'productName', required: false, description: 'Name of the product', type: String })
  @ApiQuery({ name: 'origin', required: false, description: 'Origin of the product', type: String })
  @ApiQuery({ name: 'companyName', required: false, description: 'Name of the company', type: String })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price per kg', type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price per kg', type: Number })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Number of products per page', type: Number })
  async allCompanyProducts(
    @Query('category') category?: string,
    @Query('productName') productName?: string,
    @Query('origin') origin?: string,
    @Query('companyName') companyName?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ): Promise<CompanyProduct[]> {
    const filters: any = {};
  
    if (category) {
      filters.category = { name_category: category };
    }
  
    if (productName) {
      filters.company_product_name = { contains: productName, mode: 'insensitive' };
    }
  
    if (origin) {
      filters.origin = { contains: origin, mode: 'insensitive' };
    }
  
    if (companyName) {
      filters.company = { company_name: companyName };
    }
  
    if (minPrice || maxPrice) {
      filters.company_price_x_kg = {};
      if (minPrice) filters.company_price_x_kg.gte = minPrice;
      if (maxPrice) filters.company_price_x_kg.lte = maxPrice;
    }
  
    // Llamada al servicio con filtros, página y límite
    return this.companyProductsService.findAllWithFilters(filters, page, limit);
  }
  
  
  
  
  


  @Get('company/:id')
  async getAllMyCompanyProducts(@Param('id') companyId: string) {
    return await this.companyProductsService.findAllByCompanyIdServices(companyId);
  }
 
  @Get("company/:companyId/product/:productId")
  async getProductById(@Param('companyId') companyId: string, @Param('productId') productId: string) {
    return await this.companyProductsService.findProductByIdServices(companyId, productId);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier') 
  @Post()
  async create(@Body() createCompanyProductDto: CreateCompanyProductDto) {
    console.log("Received product data:", createCompanyProductDto);

      return this.companyProductsService.createProductServices(createCompanyProductDto);
  }

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'supplier') 
  @Put(":id")
  async updateProduct(@Param("id") productId: string, @Body() productData: UpdateCompanyProductDto){
    return this.companyProductsService.updateProductServices(productId, productData) 
  }


  @ApiBearerAuth()
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
