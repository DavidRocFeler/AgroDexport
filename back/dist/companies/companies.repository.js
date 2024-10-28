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
exports.CompanyRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let CompanyRepository = class CompanyRepository {
    constructor(notificationsService, prisma) {
        this.notificationsService = notificationsService;
        this.prisma = prisma;
    }
    async getAll() {
        return this.prisma.company.findMany({
            include: {
                user: {
                    select: {
                        role: {
                            select: {
                                role_name: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async getWithFilters(filters) {
        return this.prisma.company.findMany({
            where: {
                OR: [
                    { isActive: true },
                    { isActive: false },
                ],
                AND: filters,
            },
        });
    }
    async findById(companyId) {
        const company = await this.prisma.company.findUnique({
            where: { company_id: companyId },
            include: {
                user: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (!company || !company.isActive) {
            throw new common_1.NotFoundException('Company not found');
        }
        return company;
    }
    async findByName(companyName) {
        if (!companyName) {
            throw new Error("El nombre de la compañía no puede ser vacío");
        }
        const company = await this.prisma.company.findUnique({
            where: {
                company_name: companyName,
            },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        });
        return company;
    }
    async findCompaniesByUserId(userId) {
        return this.prisma.company.findMany({
            where: {
                user_id: userId,
            },
        });
    }
    async create(companyData) {
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
        const company = await this.prisma.company.create({
            data: { ...companyData, isActive: true }
        });
        await this.notificationsService.createAndNotifyUsers('admin', `New company created: ${company.company_name}`, 'company_created');
        return company;
    }
    async update(companyId, companyData) {
        const company = await this.prisma.company.findUnique({
            where: { company_id: companyId },
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        if (!company.isActive) {
            throw new common_1.NotFoundException('Company is inactive');
        }
        return await this.prisma.company.update({
            where: { company_id: companyId },
            data: companyData,
        });
    }
    async softDelete(companyId) {
        const company = await this.prisma.company.findUnique({
            where: { company_id: companyId },
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        return this.prisma.company.update({
            where: { company_id: companyId },
            data: { isActive: false },
        });
    }
    async findByAcoountPaypalById(company_supplier_id) {
        const accountPaypal = await this.prisma.company.findUnique({
            where: { company_id: company_supplier_id },
            select: { account_paypal: true },
        });
        return accountPaypal?.account_paypal;
    }
};
exports.CompanyRepository = CompanyRepository;
exports.CompanyRepository = CompanyRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        prisma_service_1.PrismaService])
], CompanyRepository);
//# sourceMappingURL=companies.repository.js.map