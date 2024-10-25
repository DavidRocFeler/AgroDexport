"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmerCertificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const farmer_certifications_dto_1 = require("./farmer-certifications.dto");
const class_validator_1 = require("class-validator");
class UpdateFarmerCertificationDto extends (0, swagger_1.PartialType)(farmer_certifications_dto_1.CreateFarmerCertificationDto) {
}
exports.UpdateFarmerCertificationDto = UpdateFarmerCertificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the company',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerCertificationDto.prototype, "company_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the phytosanitary certificate',
        example: 'https://example.com/phytosanitary_certificate.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerCertificationDto.prototype, "phytosanitary_certificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the agricultural producer certificate',
        example: 'https://example.com/agricultural_producer_cert.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerCertificationDto.prototype, "agricultural_producer_cert", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the organic certification',
        example: 'https://example.com/organic_certification.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerCertificationDto.prototype, "organic_certification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the quality certificate',
        example: 'https://example.com/quality_certificate.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerCertificationDto.prototype, "quality_certificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the certificate of origin',
        example: 'https://example.com/certificate_of_origin.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerCertificationDto.prototype, "certificate_of_origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of product IDs associated with this certification',
        example: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateFarmerCertificationDto.prototype, "company_product_ids", void 0);
//# sourceMappingURL=update-farmer-certifications.dto.js.map