import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateFarmerCertificationDto } from "./farmer-certifications.dto";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateFarmerCertificationDto extends PartialType(CreateFarmerCertificationDto) {
    @ApiProperty({
        description: 'ID of the company',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    })
    @IsString()
    @IsOptional()
    company_id?: string;

    @ApiProperty({
        description: 'URL of the phytosanitary certificate',
        example: 'https://example.com/phytosanitary_certificate.jpg',
        required: false,
    })
    @IsOptional()
    phytosanitary_certificate?: string;

    @ApiProperty({
        description: 'URL of the agricultural producer certificate',
        example: 'https://example.com/agricultural_producer_cert.jpg',
        required: false,
    })
    @IsOptional()
    agricultural_producer_cert?: string;

    @ApiProperty({
        description: 'URL of the organic certification',
        example: 'https://example.com/organic_certification.jpg',
        required: false,
    })
    @IsOptional()
    organic_certification?: string;

    @ApiProperty({
        description: 'URL of the quality certificate',
        example: 'https://example.com/quality_certificate.jpg',
        required: false,
    })
    @IsOptional()
    quality_certificate?: string;

    @ApiProperty({
        description: 'URL of the certificate of origin',
        example: 'https://example.com/certificate_of_origin.jpg',
        required: false,
    })
    @IsOptional()
    certificate_of_origin?: string;

    @ApiProperty({
        description: 'List of product IDs associated with this certification',
        example: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    company_product_ids?: string[];
}
