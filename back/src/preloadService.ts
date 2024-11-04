import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { RolesService } from './roles/roles.service';
import { AuthService } from './auth/auth.service';
import { CompanyService } from './companies/companies.service';
import { AddressesService } from './addresses/addresses.service';
import { CompanyProductsService } from './company-products/company-products.service';
import { OrdersService } from './orders/orders.service';

@Injectable()
export class PreloadService implements OnModuleInit {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly rolesService: RolesService, 
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
    private readonly AddressService: AddressesService,
    private readonly companyProductsService: CompanyProductsService,
    private readonly orderService: OrdersService
  ) {}

  async onModuleInit() {
    console.log('Starting preload process...');
  
    try {
      const categoryResults = await this.categoryService.preloadCategoriesService();
      // console.log('Categories preload results:', categoryResults);
    } catch (error) {
      console.error('Error during categories preload:', error.message);
    }
  
    try {
      const roleResults = await this.rolesService.seedRoles();
      // console.log('Roles preload results:', roleResults);
    } catch (error) {
      console.error('Error during roles preload:', error.message);
    }
  
    try {
      const userResults = await this.authService.preloadUsersService();
      // console.log('Users preload results:', userResults);
    } catch (error) {
      console.error('Error during users preload:', error.message);
    }
  
    try {
      const companiesResults = await this.companyService.preloadCompaniesService();
      // console.log('Companies preload results:', companiesResults);
    } catch (error) {
      console.error('Error during companies preload:', error.message);
    }
  
    try {
      const addressResults = await this.AddressService.preloadShippingAddressesService();
      // console.log('ShippingAddress preload results:', addressResults);
    } catch (error) {
      console.error('Error during shipping addresses preload:', error.message);
    }
  
    try {
      const companyProductsResults = await this.companyProductsService.preloadCompanyProductsService();
      // console.log('CompanyProducts preload results:', companyProductsResults);
    } catch (error) {
      console.error('Error during company products preload:', error.message);
    }

    try {
      const ordersResults = await this.orderService.preloadOrdersService();
      // console.log('Orders preload results:', ordersResults);
    } catch (error) {
      console.error('Error during orders preload:', error.message);
    }

    try {
      const paymentsFinishedResults = await this.orderService.preloadPaymentsFinished();
      // console.log('Payments Finished preload results:', paymentsFinishedResults);
    } catch (error) {
      console.error('Error during payments finished preload:', error.message);
    }

    try {
      const paymentsCancelledResults = await this.orderService.preloadPaymentsCancel();
      // console.log('Payments Cancelled preload results:', paymentsCancelledResults);
    } catch (error) {
      console.error('Error during payments Cancelled preload:', error.message);
    }
   
    console.log('Preload process completed...');
  }

  
  
}