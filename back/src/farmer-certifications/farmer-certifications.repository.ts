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
