"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyProductsModule = void 0;
const common_1 = require("@nestjs/common");
const company_products_controller_1 = require("./company-products.controller");
const company_products_service_1 = require("./company-products.service");
let CompanyProductsModule = class CompanyProductsModule {
};
exports.CompanyProductsModule = CompanyProductsModule;
exports.CompanyProductsModule = CompanyProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [company_products_controller_1.CompanyProductsController],
        providers: [company_products_service_1.CompanyProductsService]
    })
], CompanyProductsModule);
//# sourceMappingURL=company-products.module.js.map