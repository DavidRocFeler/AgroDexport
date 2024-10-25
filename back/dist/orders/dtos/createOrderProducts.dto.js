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
exports.CreateOrderProductsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validateIfFiveProducts_1 = require("../../helpers/validateIfFiveProducts");
class CreateOrderProductsDto {
}
exports.CreateOrderProductsDto = CreateOrderProductsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the company buyer',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'company_buyer_id is required.' }),
    (0, class_validator_1.IsUUID)('all', { message: 'company_buyer_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderProductsDto.prototype, "company_buyer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the company supplier',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'company_supplier_id required.' }),
    (0, class_validator_1.IsUUID)('all', { message: 'company_supplier_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderProductsDto.prototype, "company_supplier_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product one (mandatory)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'product_one_id is required.' }),
    (0, class_validator_1.IsUUID)('all', { message: 'product_one_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderProductsDto.prototype, "product_one_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of product one',
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'quantity_product_one is required.' }),
    (0, class_validator_1.IsInt)({ message: 'quantity_product_one must be an integer.' }),
    (0, class_validator_1.IsPositive)({ message: 'Quantity of product_one must be a positive integer.' }),
    __metadata("design:type", Number)
], CreateOrderProductsDto.prototype, "quantity_product_one", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product two (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('all', { message: 'product_two_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderProductsDto.prototype, "product_two_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of product two',
        example: 5,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'quantity_product_two must be an integer.' }),
    (0, class_validator_1.IsPositive)({ message: 'Quantity of product_two must be a positive integer.' }),
    __metadata("design:type", Number)
], CreateOrderProductsDto.prototype, "quantity_product_two", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product three (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('all', { message: 'product_three_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderProductsDto.prototype, "product_three_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of product three',
        example: 2,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'quantity_product_three must be an integer.' }),
    (0, class_validator_1.IsPositive)({ message: 'Quantity of product_three must be a positive integer.' }),
    __metadata("design:type", Number)
], CreateOrderProductsDto.prototype, "quantity_product_three", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product four (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('all', { message: 'product_four_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderProductsDto.prototype, "product_four_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of product four',
        example: 1,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'quantity_product_four must be an integer.' }),
    (0, class_validator_1.IsPositive)({ message: 'Quantity of product_four must be a positive integer.' }),
    __metadata("design:type", Number)
], CreateOrderProductsDto.prototype, "quantity_product_four", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product five (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('all', { message: 'product_five_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderProductsDto.prototype, "product_five_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of product five',
        example: 3,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'quantity_product_five must be an integer.' }),
    (0, class_validator_1.IsPositive)({ message: 'Quantity of product_five must be a positive integer.' }),
    __metadata("design:type", Number)
], CreateOrderProductsDto.prototype, "quantity_product_five", void 0);
__decorate([
    (0, class_validator_1.Validate)(validateIfFiveProducts_1.ValidateIfFiveProducts, {
        message: 'You cannot include more than 5 products.'
    }),
    __metadata("design:type", Number)
], CreateOrderProductsDto.prototype, "productsCount", void 0);
//# sourceMappingURL=createOrderProducts.dto.js.map