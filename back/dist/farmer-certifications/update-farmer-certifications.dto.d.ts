import { CreateFarmerCertificationDto } from "./farmer-certifications.dto";
declare const UpdateFarmerCertificationDto_base: import("@nestjs/common").Type<Partial<CreateFarmerCertificationDto>>;
export declare class UpdateFarmerCertificationDto extends UpdateFarmerCertificationDto_base {
    company_id?: string;
    phytosanitary_certificate?: string;
    agricultural_producer_cert?: string;
    organic_certification?: string;
    quality_certificate?: string;
    certificate_of_origin?: string;
    company_product_ids?: string[];
}
export {};
