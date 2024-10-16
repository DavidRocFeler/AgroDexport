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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CompanyService = class CompanyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllCompaniesServices() {
        return await this.prisma.company.findMany({
            where: { isActive: true },
        });
    }
    async getCompanyByIdServices(companyId) {
        const company = await this.prisma.company.findUnique({
            where: { company_id: companyId },
        });
        if (!company || !company.isActive) {
            throw new common_1.NotFoundException('Company not found');
        }
        return company;
    }
    async createCompanyServices(companyData) {
        const userExists = await this.prisma.user.findUnique({
            where: { user_id: companyData.user_id },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found. Please provide a valid user ID.');
        }
        const existingCompany = await this.prisma.company.findFirst({
            where: {
                tax_identification_number: companyData.tax_identification_number,
                country: companyData.country,
                isActive: true,
            },
        });
        if (existingCompany) {
            throw new common_1.ConflictException('A company with this tax identification number already exists in the same country.');
        }
        const newCompany = await this.prisma.company.create({
            data: {
                user_id: companyData.user_id,
                company_name: companyData.company_name,
                tax_identification_number: companyData.tax_identification_number,
                address: companyData.address,
                postal_code: companyData.postal_code,
                city: companyData.city,
                state: companyData.state,
                country: companyData.country,
                industry: companyData.industry,
                website: companyData.website,
                account_paypal: companyData.account_paypal,
                company_description: companyData.company_description,
                company_logo: companyData.company_logo,
                isActive: true,
            },
        });
        return newCompany;
    }
    async updateCompanyServices(companyId, companyData) {
        const company = await this.prisma.company.findUnique({
            where: { company_id: companyId },
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        const updatedCompany = await this.prisma.company.update({
            where: { company_id: companyId },
            data: companyData,
        });
        return updatedCompany;
    }
    async softDeleteCompanyServices(companyId) {
        const company = await this.prisma.company.findUnique({
            where: { company_id: companyId },
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        const deletedCompany = await this.prisma.company.update({
            where: { company_id: companyId },
            data: { isActive: false },
        });
        return deletedCompany;
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyService);
//# sourceMappingURL=companies.service.js.map