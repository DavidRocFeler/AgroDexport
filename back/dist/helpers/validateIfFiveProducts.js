"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIfFiveProducts = void 0;
const class_validator_1 = require("class-validator");
let ValidateIfFiveProducts = class ValidateIfFiveProducts {
    validate(value, args) {
        const dto = args.object;
        const products = [
            dto.product_one_id,
            dto.product_two_id,
            dto.product_three_id,
            dto.product_four_id,
            dto.product_five_id
        ];
        const productCount = products.filter(product => product !== undefined && product !== null).length;
        return productCount <= 5;
    }
    defaultMessage(args) {
        return 'No more than 5 products are allowed.';
    }
};
exports.ValidateIfFiveProducts = ValidateIfFiveProducts;
exports.ValidateIfFiveProducts = ValidateIfFiveProducts = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'ValidateIfFiveProducts', async: false })
], ValidateIfFiveProducts);
//# sourceMappingURL=validateIfFiveProducts.js.map