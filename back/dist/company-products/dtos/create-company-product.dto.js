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
exports.CreateCompanyProductDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCompanyProductDto {
}
exports.CreateCompanyProductDto = CreateCompanyProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the company',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('all', { message: 'company_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateCompanyProductDto.prototype, "company_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product category',
        example: 'a0eebef6-21b4-4f60-a2a7-4b8b9c9a09f3',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('all', { message: 'category_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateCompanyProductDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the company product',
        example: 'Organic Tomato',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'company_product_name must not exceed 255 characters.' }),
    __metadata("design:type", String)
], CreateCompanyProductDto.prototype, "company_product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the company product',
        example: 'Fresh and organic tomatoes from the region.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500, { message: 'company_product_description must not exceed 500 characters.' }),
    __metadata("design:type", String)
], CreateCompanyProductDto.prototype, "company_product_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available stock of the product',
        example: 100,
    }),
    (0, class_validator_1.IsInt)({ message: 'stock must be an integer.' }),
    (0, class_validator_1.Min)(0, { message: 'stock cannot be less than 0.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum order quantity',
        example: 5,
    }),
    (0, class_validator_1.IsInt)({ message: 'minimum_order must be an integer.' }),
    (0, class_validator_1.Min)(5, { message: 'minimum_order must be at least 5.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "minimum_order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Origin of the product',
        example: 'Colombia',
    }),
    (0, class_validator_1.IsString)({ message: 'origin must be a string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'origin cannot be empty.' }),
    __metadata("design:type", String)
], CreateCompanyProductDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Discount percentage, must be between 0 and 99.',
        example: 10,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'discount must be a number.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'discount cannot be empty.' }),
    (0, class_validator_1.Min)(0, { message: 'discount must be at least 0.' }),
    (0, class_validator_1.Max)(99, { message: 'discount must be at most 99.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price per kilogram of the company',
        example: 2.5,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'company_price_x_kg must be a number.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'company_price_x_kg cannot be empty.' }),
    (0, class_validator_1.Min)(0, { message: 'company_price_x_kg must be at least 0.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "company_price_x_kg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Harvest date of the product',
        example: '2024-10-19',
    }),
    (0, class_validator_1.IsString)({ message: 'harvest_date must be a string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'harvest_date cannot be empty.' }),
    __metadata("design:type", String)
], CreateCompanyProductDto.prototype, "harvest_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the product image',
        example: 'https://example.com/tomato.jpg',
    }),
    (0, class_validator_1.IsString)({ message: 'company_product_img must be a string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'company_product_img cannot be empty.' }),
    (0, class_validator_1.IsUrl)({}, { message: 'company_product_img must be a valid URL.' }),
    __metadata("design:type", String)
], CreateCompanyProductDto.prototype, "company_product_img", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Calories per serving of the product, if applicable',
        example: 20.0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'calories must be a number.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'calories must be at least 0.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "calories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fat content per serving of the product, if applicable',
        example: 0.5,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'fat must be a number.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'fat must be at least 0.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "fat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Protein content per serving of the product, if applicable',
        example: 1.0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'protein must be a number.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'protein must be at least 0.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "protein", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Carbohydrate content per serving of the product, if applicable',
        example: 4.0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'carbs must be a number.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'carbs must be at least 0.' }),
    __metadata("design:type", Number)
], CreateCompanyProductDto.prototype, "carbs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates whether the product is active or inactive', default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'The isActive field must be a boolean value.' }),
    __metadata("design:type", Boolean)
], CreateCompanyProductDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-company-product.dto.js.map