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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
const createCompany_dto_1 = require("./createCompany.dto");
let CompanyController = class CompanyController {
    constructor(companyServices) {
        this.companyServices = companyServices;
    }
    async getAllCompanies() {
        const companies = await this.companyServices.getAllCompaniesServices();
        return companies;
    }
    async getCompanyById(companyId) {
        const company = await this.companyServices.getCompanyByIdServices(companyId);
        return company;
    }
    async createCompany(companyData) {
        const newCompany = await this.companyServices.createCompanyServices(companyData);
        return {
            message: 'Company created successfully',
            data: newCompany,
        };
    }
    async updateCompany(companyId, companyData) {
        const updatedCompany = await this.companyServices.updateCompanyServices(companyId, companyData);
        return updatedCompany;
    }
    async softDeleteCompany(companyId) {
        const deletedCompany = await this.companyServices.softDeleteCompanyServices(companyId);
        return {
            message: 'Company deleted successfully (soft delete)',
            data: deletedCompany,
        };
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAllCompanies", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCompany_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createCompany_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "softDeleteCompany", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)('companies'),
    __metadata("design:paramtypes", [companies_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=companies.controller.js.map