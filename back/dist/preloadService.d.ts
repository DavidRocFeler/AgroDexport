import { OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { RolesService } from './roles/roles.service';
import { AuthService } from './auth/auth.service';
import { CompanyService } from './companies/companies.service';
import { AddressesService } from './addresses/addresses.service';
import { CompanyProductsService } from './company-products/company-products.service';
export declare class PreloadService implements OnModuleInit {
    private readonly categoryService;
    private readonly rolesService;
    private readonly authService;
    private readonly companyService;
    private readonly AddressService;
    private readonly companyProductsService;
    constructor(categoryService: CategoriesService, rolesService: RolesService, authService: AuthService, companyService: CompanyService, AddressService: AddressesService, companyProductsService: CompanyProductsService);
    onModuleInit(): Promise<void>;
}
