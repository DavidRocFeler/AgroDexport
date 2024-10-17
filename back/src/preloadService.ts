import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { RolesService } from './roles/roles.service';
// import { UsersService } from './users/users.service';
// import { CompaniesService } from './companies/companies.service';
// import { AddressesService } from './addresses/addresses.service';
// import { CompanyProductsService } from './company-products/company-products.service';
// import { DiscountsService } from './discounts/discounts.service';

@Injectable()
export class PreloadService implements OnModuleInit {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly rolesService: RolesService, 
    // private readonly userService: UsersService,
    // private readonly companyService: CompaniesService,
    // private readonly shippingAddressService: AddressesService,
    // private readonly companyProductsService: CompanyProductsService,
    // private readonly discount: DiscountsService
  ) {}

  async onModuleInit() {
    console.log('Starting preload process...');

    try {
      const categoryResults = await this.categoryService.preloadCategoriesService();
      console.log('Categories preload results:', categoryResults);

      const roleResults = await this.rolesService.seedRoles();
      console.log('Roles preload results:', roleResults);
      
    } catch (error) {
      console.error('Error during categories preload:', error.message);
    }
  }
}