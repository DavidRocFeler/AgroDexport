import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateShippingAddressDto } from './updateShippingAddress.dto';
import { CreateShippingAddressDto } from './createShippingAddress.dto';
import { Prisma, ShippingAddress } from '@prisma/client';

@Injectable()
export class AddressesRepository {

    constructor(private readonly prisma: PrismaService) {}

    async findAllActive() {
        return this.prisma.shippingAddress.findMany({
          where: { isActive: true },
        });
      }
    
      async findById(addressId: string) {
        const address = await this.prisma.shippingAddress.findUnique({
          where: { shipping_address_id : addressId },
        });
    
        if (!address || !address.isActive) {
          throw new NotFoundException('Address not found');
        }
    
        return address;
      }

      async findByAddress(address: string) {
        const shippingAddress = await this.prisma.shippingAddress.findFirst({
            where: { address },
            include: {
              company: {
                select: {
                  company_name: true,
                },
              },
            },
          });
      
        return shippingAddress;
      }
      
      async updateAddress(addressId: string, addressData: UpdateShippingAddressDto) {
        await this.findById(addressId);
    
        return this.prisma.shippingAddress.update({
          where: { shipping_address_id: addressId },
          data: addressData,
        });
      }

      async create(shippingAddressData: CreateShippingAddressDto): Promise<ShippingAddress> {
    
        const data: Prisma.ShippingAddressUncheckedCreateInput = {
            ...shippingAddressData,
            isActive: true,
          };
        
          return this.prisma.shippingAddress.create({ data });
        }

      async softDelete(addressId: string) {
        await this.findById(addressId);
    
        return this.prisma.shippingAddress.update({
          where: { shipping_address_id: addressId },
          data: { isActive: false },
        });
      }
}