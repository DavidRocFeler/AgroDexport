import { PrismaService } from '../prisma/prisma.service';
import { CreateFarmerCertificationDto } from './farmer-certifications.dto';
import { UpdateFarmerCertificationDto } from './update-farmer-certifications.dto';
export declare class FarmerCertificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(certificationData: CreateFarmerCertificationDto): Promise<{
        company_id: string;
        farmer_id: string;
        phytosanitary_certificate: string | null;
        agricultural_producer_cert: string | null;
        organic_certification: string | null;
        quality_certificate: string | null;
        certificate_of_origin: string | null;
    }>;
    findByFarmerId(farmerId: string): Promise<{
        company_id: string;
        farmer_id: string;
        phytosanitary_certificate: string | null;
        agricultural_producer_cert: string | null;
        organic_certification: string | null;
        quality_certificate: string | null;
        certificate_of_origin: string | null;
    }[]>;
    update(farmerId: string, updateData: UpdateFarmerCertificationDto): Promise<{
        company_id: string;
        farmer_id: string;
        phytosanitary_certificate: string | null;
        agricultural_producer_cert: string | null;
        organic_certification: string | null;
        quality_certificate: string | null;
        certificate_of_origin: string | null;
    }>;
    delete(farmerId: string): Promise<{
        company_id: string;
        farmer_id: string;
        phytosanitary_certificate: string | null;
        agricultural_producer_cert: string | null;
        organic_certification: string | null;
        quality_certificate: string | null;
        certificate_of_origin: string | null;
    }>;
}
