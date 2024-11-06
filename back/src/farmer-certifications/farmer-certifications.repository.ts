import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateFarmerCertificationDto } from './farmer-certifications.dto';
import { UpdateFarmerCertificationDto } from './update-farmer-certifications.dto';

@Injectable()
export class FarmerCertificationRepository {
    
    constructor(private readonly prisma: PrismaService) {}

    async create(certificationData: CreateFarmerCertificationDto) {
        const { company_product_ids, ...rest } = certificationData; 
    
        try {
            const certification = await this.prisma.farmerCertification.create({
                data: {
                    ...rest,
                    products: {
                        connect: company_product_ids.map(productId => ({
                            company_product_id: productId,
                        })),
                    },
                },
            });
    
            return certification;
        } catch (error) {
            console.error('Error creating Farmer Certification:', error);
            throw new InternalServerErrorException('An error occurred while creating the Farmer Certification.');
        }
    }
    
    
    async findByFarmerId(farmerId: string) {
        return await this.prisma.farmerCertification.findMany({
            where: { farmer_id: farmerId },
        });
    }

    async getFarmerByOrderIdRepository(orderId: string) {
        console.log("orderId: ", orderId);
        const order = await this.prisma.order.findUnique({
            where: {order_id: orderId}
        })
        
        const orderDetailId = order.order_details_id

        const orderdetail = await this.prisma.producStockOrderDetail.findFirst({
            where: { order_details_id: orderDetailId },
        })

        const productId = orderdetail.company_product_id

        const product = await this.prisma.companyProduct.findUnique({
            where: { company_product_id: productId },
        })

        const farmerId = product.farmer_id

        return await this.prisma.farmerCertification.findUnique({
            where: { farmer_id: farmerId },
        })

    }
    
    async update(farmerId: string, updateData: UpdateFarmerCertificationDto) {
        return await this.prisma.farmerCertification.update({
            where: { farmer_id: farmerId },
            data: updateData,
        });
    }

    async delete(farmerId: string) {
        return await this.prisma.farmerCertification.delete({
            where: { farmer_id: farmerId },
        });
    }

    
}
