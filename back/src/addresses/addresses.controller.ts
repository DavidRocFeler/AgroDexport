import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
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
    async getAllAddresses() {
    const addresses = await this.addressesService.getAllAddressesService();
    return addresses;
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
