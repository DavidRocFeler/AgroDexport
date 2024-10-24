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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the selling company',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)('all', { message: 'id_company_sell must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "id_company_sell", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the payment (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('all', { message: 'id_payments must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "id_payments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Shipping address ID (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('all', { message: 'shipping_address_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipping_address_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Order details ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)('all', { message: 'order_details_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "order_details_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supply chain ID (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('all', { message: 'supply_chain_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "supply_chain_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date the order was placed',
        example: '2023-10-12',
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "order_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment ID (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('all', { message: 'payment_id must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment_id", void 0);
//# sourceMappingURL=create-order.dto.js.map