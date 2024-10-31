"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadService = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories/categories.service");
const roles_service_1 = require("./roles/roles.service");
const auth_service_1 = require("./auth/auth.service");
const companies_service_1 = require("./companies/companies.service");
const addresses_service_1 = require("./addresses/addresses.service");
const company_products_service_1 = require("./company-products/company-products.service");
let PreloadService = class PreloadService {
    constructor(categoryService, rolesService, authService, companyService, AddressService, companyProductsService) {
        this.categoryService = categoryService;
        this.rolesService = rolesService;
        this.authService = authService;
        this.companyService = companyService;
        this.AddressService = AddressService;
        this.companyProductsService = companyProductsService;
    }
    async onModuleInit() {
        console.log('Starting preload process...');
        try {
            const categoryResults = await this.categoryService.preloadCategoriesService();
        }
        catch (error) {
            console.error('Error during categories preload:', error.message);
        }
        try {
            const roleResults = await this.rolesService.seedRoles();
        }
        catch (error) {
            console.error('Error during roles preload:', error.message);
        }
        try {
            const userResults = await this.authService.preloadUsersService();
        }
        catch (error) {
            console.error('Error during users preload:', error.message);
        }
        try {
            const companiesResults = await this.companyService.preloadCompaniesService();
        }
        catch (error) {
            console.error('Error during companies preload:', error.message);
        }
        try {
            const addressResults = await this.AddressService.preloadShippingAddressesService();
        }
        catch (error) {
            console.error('Error during shipping addresses preload:', error.message);
        }
        try {
            const companyProductsResults = await this.companyProductsService.preloadCompanyProductsService();
        }
        catch (error) {
            console.error('Error during company products preload:', error.message);
        }
        console.log('Preload process completed...');
    }
};
exports.PreloadService = PreloadService;
exports.PreloadService = PreloadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        roles_service_1.RolesService,
        auth_service_1.AuthService,
        companies_service_1.CompanyService,
        addresses_service_1.AddressesService,
        company_products_service_1.CompanyProductsService])
], PreloadService);
//# sourceMappingURL=preloadService.js.map