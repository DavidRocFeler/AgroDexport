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
exports.CompanyProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let CompanyProductsRepository = class CompanyProductsRepository {
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async findAll() {
        return this.prisma.companyProduct.findMany({
            include: {
                farmerCertification: true,
                category: true,
            },
        });
    }
    async findProductsWithoutFarmer() {
        return this.prisma.companyProduct.findMany({
            where: { farmer_id: null },
            include: {
                company: {
                    include: {
                        user: {
                            include: {
                                credential: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findProductsWithIncompleteCertifications() {
        return this.prisma.companyProduct.findMany({
            where: {
                farmer_id: { not: null },
                farmerCertification: {
                    OR: [
                        { phytosanitary_certificate: null },
                        { agricultural_producer_cert: null },
                        { organic_certification: null },
                        { quality_certificate: null },
                        { certificate_of_origin: null },
                    ],
                },
            },
            include: {
                farmerCertification: true,
                company: {
                    include: {
                        user: {
                            include: {
                                credential: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findAllByCompanyId(companyId) {
        return this.prisma.companyProduct.findMany({
            where: { company_id: companyId },
        });
    }
    async findProductByIdRepository(companyId, productId) {
        const product = await this.prisma.companyProduct.findUnique({
            where: {
                company_id: companyId,
                company_product_id: productId
            },
            include: {
                farmerCertification: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found for company ${companyId}`);
        }
        return product;
    }
    async createProductRepository(createCompanyProductDto) {
        const { harvest_date, ...rest } = createCompanyProductDto;
        const parsedHarvestDate = new Date(harvest_date);
        const totalPrice = (createCompanyProductDto.minimum_order * 1000) * createCompanyProductDto.company_price_x_kg;
        const discountPrice = totalPrice * ((100 - createCompanyProductDto.discount) / 100);
        const roundedDiscountPrice = parseFloat(discountPrice.toFixed(2));
        if (isNaN(parsedHarvestDate.getTime())) {
            throw new Error('Invalid harvest date format. Please provide a valid ISO-8601 date string.');
        }
        const product = await this.prisma.companyProduct.create({
            data: {
                ...rest,
                harvest_date: parsedHarvestDate,
                total_price: roundedDiscountPrice,
            },
        });
        const company = await this.findByProductNameAndCompanyId(product.company_product_name, product.company_id);
        await this.notificationsService.createAndNotifyUsers('buyer', `Company ${company.company.company_name} added the followind Product: ${product.company_product_name}`, 'product_created');
        return product;
    }
    async updateProductRepository(productId, productData) {
        return await this.prisma.companyProduct.update({
            where: { company_product_id: productId },
            data: productData,
        });
    }
    async findByProductNameAndCompanyId(productName, companyId) {
        const product = await this.prisma.companyProduct.findFirst({
            where: {
                company_product_name: productName,
                company_id: companyId,
            },
            include: {
                company: true,
            },
        });
        return product;
    }
    async findProductById(productId) {
        return this.prisma.companyProduct.findUnique({
            where: { company_product_id: productId },
            select: { isActive: true },
        });
    }
    async findProductsByIds(companyproductsIds) {
        return this.prisma.companyProduct.findMany({
            where: {
                company_product_id: {
                    in: companyproductsIds,
                },
            },
        });
    }
    async softDeleteProductRepository(productId) {
        const product = await this.prisma.companyProduct.findUnique({
            where: { company_product_id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.prisma.companyProduct.update({
            where: { company_product_id: productId },
            data: { isActive: false },
        });
    }
    async findByIdMinimumOrder(product_one_id) {
        const product = await this.prisma.companyProduct.findUnique({
            where: { company_product_id: product_one_id },
            select: { minimum_order: true },
        });
        return product?.minimum_order;
    }
    async findByIdStock(product_one_id) {
        const product = await this.prisma.companyProduct.findUnique({
            where: { company_product_id: product_one_id },
            select: { stock: true },
        });
        return product?.stock;
    }
};
exports.CompanyProductsRepository = CompanyProductsRepository;
exports.CompanyProductsRepository = CompanyProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], CompanyProductsRepository);
//# sourceMappingURL=company-products.repository.js.map