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
exports.CreateCompanyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCompanyDto {
}
exports.CreateCompanyDto = CreateCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID who owns the company', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the company', maxLength: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "company_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tax identification number of the company', example: 123456789 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateCompanyDto.prototype, "tax_identification_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address of the company', maxLength: 255 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code of the company', maxLength: 20 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'City where the company is located', required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'State where the company is located', required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country where the company is located', required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Industry in which the company operates', required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Website of the company', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'PayPal account associated with the company', required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "account_paypal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the company', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "company_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Logo URL of the company', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "company_logo", void 0);
//# sourceMappingURL=createCompany.dto.js.map