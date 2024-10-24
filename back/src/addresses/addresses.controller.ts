import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/RolesGuard';
import { AddressesService } from './addresses.service';
import { CreateShippingAddressDto } from './createShippingAddress.dto';
import { UpdateShippingAddressDto } from './updateShippingAddress.dto';


@ApiTags("ShippingAddresses")
@Controller('ShippingAddresses')
export class AddressesController {

    constructor( 
        private readonly addressesService: AddressesService

    ) {}

    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiQuery({ name: 'contact_name', required: false, description: 'Name of the contact person for the shipping address' })
    @ApiQuery({ name: 'contact_lastname', required: false, description: 'Last name of the contact person for the shipping address' })
    @ApiQuery({ name: 'contact_email', required: false, description: 'Email of the contact person for the shipping address' })
    @ApiQuery({ name: 'city', required: false, description: 'City where the shipping address is located' })
    @ApiQuery({ name: 'state', required: false, description: 'State or region where the shipping address is located' })
    @ApiQuery({ name: 'country', required: false, description: 'Country where the shipping address is located' })
    @ApiQuery({ name: 'isActive', required: false, enum: ['true', 'false'], description: 'Whether the shipping address is active or not' })
    @ApiQuery({ name: 'company_name', required: false, description: 'Name of the associated company' })
    @ApiQuery({ name: 'company_tax_id', required: false, description: 'Tax identification number of the associated company' })
    @ApiQuery({ name: 'user_name', required: false, description: 'First name of the registered user in the app' })
    @ApiQuery({ name: 'user_lastname', required: false, description: 'Last name of the registered user in the app' })
    @ApiQuery({ name: 'user_email', required: false, description: 'Email of the registered user in the app' })    
    async getAllAddresses(
      @Query('contact_name') contact_name?: string,
      @Query('contact_lastname') contact_lastname?: string,
      @Query('contact_email') contact_email?: string,
      @Query('city') city?: string,
      @Query('state') state?: string,
      @Query('country') country?: string,
      @Query('isActive') isActive?: string,
      @Query('company_name') company_name?: string,
      @Query('company_tax_id') company_tax_id?: string,
      @Query('user_name') user_name?: string,
      @Query('user_lastname') user_lastname?: string,
      @Query('user_email') user_email?: string,
    ) {
      const filters = [];
  
      if (contact_name) {
        filters.push({ contact_name: { contains: contact_name, mode: 'insensitive' } });
      }
  
      if (contact_lastname) {
        filters.push({ contact_lastname: { contains: contact_lastname, mode: 'insensitive' } });
      }
  
      if (contact_email) {
        filters.push({ contact_email: { contains: contact_email, mode: 'insensitive' } });
      }
  
      if (city) {
        filters.push({ city: { contains: city, mode: 'insensitive' } });
      }
  
      if (state) {
        filters.push({ state: { contains: state, mode: 'insensitive' } });
      }
  
      if (country) {
        filters.push({ country: { contains: country, mode: 'insensitive' } });
      }
  
      if (isActive !== undefined) {
        const isActiveBoolean = isActive === 'true';
        filters.push({ isActive: isActiveBoolean });
      }

      if (company_name) {
        filters.push({
          company: {
            company_name: { contains: company_name, mode: 'insensitive' },
          },
        });
      }      
  
      if (company_tax_id) {
        filters.push({
          company: {
            tax_identification_number: Number(company_tax_id),
          },
        });
      }
  
      if (user_name) {
        filters.push({
          company: {
            user: {
              user_name: { contains: user_name, mode: 'insensitive' },
            },
          },
        });
      }
  
      if (user_lastname) {
        filters.push({
          company: {
            user: {
              user_lastname: { contains: user_lastname, mode: 'insensitive' },
            },
          },
        });
      }
  
      if (user_email) {
        filters.push({
          company: {
            user: {
              credential: {
                email: { contains: user_email, mode: 'insensitive' },
              },
            },
          },
        });
      }
  
      if (filters.length === 0) {
        return this.addressesService.getAllAddressesService();
      }
  
      return this.addressesService.getAddressesWithFilters(filters);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id') 
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'supplier', 'buyer') 
    async getAddressById(@Param('id') addressId: string) {
    const address = await this.addressesService.getAddressByIdService(addressId);
    return address;
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('buyer')
    async createAddress(@Body() shippingAddressData: CreateShippingAddressDto) {
    const newAddress = await this.addressesService.createAddressService(shippingAddressData);
    return {
        message: 'Address created successfully',
        data: newAddress,
      };
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id') 
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('buyer')
    async updateAddress(@Param('id') addressId: string, @Body()addressData: UpdateShippingAddressDto) {
    const updatedAddress = await this.addressesService.updateAddressService(addressId, addressData);
    return updatedAddress;
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'buyer') 
  async softDeleteAddress(@Param('id') addressId: string) {
    const deletedAddress = await this.addressesService.softDeleteAddressService(addressId);
    return {
      message: 'Address deleted successfully (soft delete)',
      data: deletedAddress,
    };
  }

  @ApiExcludeEndpoint()
  @Post("sedeer")
  async preloadShippingAddresses(@Body() shippingAddressData: CreateShippingAddressDto){
      return this.addressesService.preloadShippingAddressesService();
  }
}
