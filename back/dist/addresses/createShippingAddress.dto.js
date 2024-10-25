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
exports.CreateShippingAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateShippingAddressDto {
}
exports.CreateShippingAddressDto = CreateShippingAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company ID who owns the address', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "company_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User first name', example: "Juan", maxLength: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The first name should only contain letters and no spaces' }),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "contact_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last name', example: "Perez", maxLength: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The last name should only contain letters and no spaces' }),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "contact_lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email', example: "luis@example.com", maxLength: 255 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "contact_email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "contact_phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "delivery_hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address of the company', example: "Camino del Sol 123", maxLength: 255 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The address cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The address must be a string.' }),
    (0, class_validator_1.Length)(1, 255, { message: 'The address must be between 1 and 255 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s\-,.#/]+$/, { message: 'The address can only contain letters, numbers, spaces, commas, periods, hyphens, and slashes.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The address cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code of the company', example: "111112", maxLength: 20 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The postal code cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The postal code must be a string.' }),
    (0, class_validator_1.MinLength)(1, { message: 'The postal code must have at least 1 character.' }),
    (0, class_validator_1.MaxLength)(20, { message: 'The postal code cannot exceed 20 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s\-]+$/, { message: 'The postal code can only contain letters, numbers, spaces, and hyphens.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The postal code cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'City where the company is located', example: "Zipaquira" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The city cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The city must be a string.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'The city name must be between 1 and 100 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The city can only contain letters, spaces, hyphens, apostrophes, and periods.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The city cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'State where the company is located', example: "Cundinamarca" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The state cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The state must be a string.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'The state name must be between 1 and 100 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The state can only contain letters, spaces, hyphens, apostrophes, and periods.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The state cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country where the company is located', example: "Colombia" }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The country cannot be empty.' }),
    (0, class_validator_1.IsString)({ message: 'The country must be a string.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'The country name must be between 1 and 100 characters.' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The country can only contain letters, spaces, hyphens, apostrophes, and periods.' }),
    (0, class_validator_1.Matches)(/\S/, { message: 'The country cannot consist only of spaces.' }),
    __metadata("design:type", String)
], CreateShippingAddressDto.prototype, "country", void 0);
//# sourceMappingURL=createShippingAddress.dto.js.map