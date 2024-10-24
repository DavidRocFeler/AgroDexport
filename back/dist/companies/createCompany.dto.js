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
    constructor() {
        this.company_logo = "https://i.mkt.lu/assets/logo_empresa_5.png";
    }
}
exports.CreateCompanyDto = CreateCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID who owns the company', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the company', example: "AgroVerde", maxLength: 50 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The company name cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The company name must be a string.' }),
    (0, class_validator_1.Length)(1, 50, { message: 'The company name must be between 1 and 50 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s\-]+$/, { message: 'The company name can only contain letters, numbers, spaces, and hyphens.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The company name cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "company_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tax identification number of the company', example: 123456789 }),
    (0, class_validator_1.IsInt)({ message: 'The tax identification number must be an integer.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The tax identification number cannot be empty.' }),
    (0, class_validator_1.IsPositive)({ message: 'The tax identification number must be a positive number.' }),
    (0, class_validator_1.Min)(100000000, { message: 'The tax identification number must be at least 9 digits.' }),
    (0, class_validator_1.Max)(999999999, { message: 'The tax identification number cannot exceed 9 digits.' }),
    (0, class_validator_1.NotEquals)(0, { message: 'The tax identification number cannot be all zeros.' }),
    __metadata("design:type", Number)
], CreateCompanyDto.prototype, "tax_identification_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address of the company', example: "Camino del Sol 123", maxLength: 255 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The address cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The address must be a string.' }),
    (0, class_validator_1.Length)(1, 255, { message: 'The address must be between 1 and 255 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s\-,.#/]+$/, { message: 'The address can only contain letters, numbers, spaces, commas, periods, hyphens, and slashes.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The address cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code of the company', example: "111112", maxLength: 20 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The postal code cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The postal code must be a string.' }),
    (0, class_validator_1.MinLength)(1, { message: 'The postal code must have at least 1 character.' }),
    (0, class_validator_1.MaxLength)(20, { message: 'The postal code cannot exceed 20 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s\-]+$/, { message: 'The postal code can only contain letters, numbers, spaces, and hyphens.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The postal code cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'City where the company is located', example: "Zipaquira" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The city cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The city must be a string.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'The city name must be between 1 and 100 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The city can only contain letters, spaces, hyphens, apostrophes, and periods.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The city cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'State where the company is located', example: "Cundinamarca" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The state cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The state must be a string.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'The state name must be between 1 and 100 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The state can only contain letters, spaces, hyphens, apostrophes, and periods.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The state cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country where the company is located', example: "Colombia" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The country cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The country must be a string.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'The country name must be between 1 and 100 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The country can only contain letters, spaces, hyphens, apostrophes, and periods.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The country cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Industry in which the company operates', example: "Cafetera" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The industry cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The industry must be a string.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'The industry name must be between 1 and 100 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The industry can only contain letters, spaces, hyphens, apostrophes, and periods.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The industry cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Website of the company', example: "www.agroverde.com.co" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'The website must be a string.' }),
    (0, class_validator_1.Matches)(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/, { message: 'The website must be a valid URL format.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'PayPal account associated with the company', example: "paypal@agroverde.com.co" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The PayPal account cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The PayPal account must be a string.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'The PayPal account must be a valid email format.' }),
    (0, class_validator_1.Length)(1, 255, { message: 'The PayPal account must be between 1 and 255 characters.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "account_paypal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the company', example: "Distruibuidora de Cafe", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'The company description must be a string.' }),
    (0, class_validator_1.Length)(1, 1000, { message: 'The company description must be between 1 and 1000 characters.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The company description cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "company_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Logo URL of the company', example: "https://www.agroverde.com.co/logo.jpg" }),
    (0, class_validator_1.IsString)({ message: 'The company logo must be a string.' }),
    (0, class_validator_1.Matches)(/^https?:\/\/[^\s]+$/, { message: 'The company logo must be a valid URL.' }),
    (0, class_validator_1.Length)(1, 255, { message: 'The company logo must be between 1 and 255 characters.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "company_logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates whether the company is active or inactive', default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'The isActive field must be a boolean value.' }),
    __metadata("design:type", Boolean)
], CreateCompanyDto.prototype, "isActive", void 0);
//# sourceMappingURL=createCompany.dto.js.map