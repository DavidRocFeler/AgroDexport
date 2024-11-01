import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './adresses.repository';
import { UpdateShippingAddressDto } from './updateShippingAddress.dto';
import { ShippingAddress } from '@prisma/client';
import { validateRequestBodyNotEmpty } from 'src/helpers/validation.helper';
import { CreateShippingAddressDto } from './createShippingAddress.dto';
import { CompanyRepository } from '../companies/companies.repository';
import * as shippingAddressesData from '../assets/shippingAdresses.json';

@Injectable()
export class AddressesService {

    constructor(
    private readonly addressRepository: AddressesRepository,
    private readonly companyRepository: CompanyRepository,
    ) {}

    async getAllAddressesService(): Promise<ShippingAddress[]> {
        return this.addressRepository.getAll();
      }
    
      async getAddressesWithFilters(filters: any[]): Promise<ShippingAddress[]> {
        return this.addressRepository.getWithFilters(filters);
      }
      async getAddressByCompanyIdService(companyId: string): Promise<string | null> {
        return await this.addressRepository.findAddressByCompanyId(companyId);
    }
    
      async getAddressByIdService(addressId: string) {
        return this.addressRepository.findById(addressId);
      }

      async updateAddressService(companyId: string, addressData: UpdateShippingAddressDto): Promise<ShippingAddress> {
        validateRequestBodyNotEmpty(addressData);
            return await this.addressRepository.updateAddressByCompanyId(companyId, addressData);
        }    
        
        async createAddressService(shippingAddressData: CreateShippingAddressDto) {
          const companyExists = await this.companyRepository.findById(shippingAddressData.company_id);

          const existingAddress = await this.addressRepository.findAddressByCompanyId(shippingAddressData.company_id);
          if (existingAddress) {
              throw new Error("The company already has a shipping address assigned.");
          }
      
          return this.addressRepository.create(shippingAddressData);
      }
      

        async softDeleteAddressService(addressId: string) {
            return this.addressRepository.softDelete(addressId);
          } 

          async preloadShippingAddressesService(): Promise<{ shippingAddress: string; status: string }[]> {
            const results: { shippingAddress: string; status: string }[] = [];
        
            for (const shippingAddressData of shippingAddressesData) {
                const company = await this.companyRepository.findByName(shippingAddressData['company_name']);
                if (!company) {
                    results.push({ shippingAddress: shippingAddressData['address'], status: 'Company not found' });
                    continue;
                }
        
                const existingAddress = await this.addressRepository.findAddressByCompanyId(company.company_id);
        
                if (existingAddress) { 
                      results.push({ shippingAddress: shippingAddressData['address'], status: 'Address already exists for this company' });
                      continue;
                     }
        
                const { company_name, ...shippingAddressWithoutCompanyName } = shippingAddressData;
                const shippingAddressWithCompanyId = { ...shippingAddressWithoutCompanyName, company_id: company.company_id };
        
                await this.addressRepository.create(shippingAddressWithCompanyId);
                results.push({ shippingAddress: shippingAddressData.address, status: 'Created' });
            }
            return results;
        }
        
}