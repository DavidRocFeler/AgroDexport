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
exports.CloudinaryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const validation_helper_1 = require("../helpers/validation.helper");
let CloudinaryRepository = class CloudinaryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateUserProfilePicture(userId, url) {
        const user = await this.prisma.user.findUnique({ where: { user_id: userId } });
        (0, validation_helper_1.validateExists)(user, 'notExists', 'User not found');
        await this.prisma.user.update({
            where: { user_id: userId },
            data: { profile_picture: url },
        });
    }
    async updateCompanyLogo(companyId, url) {
        const company = await this.prisma.company.findUnique({ where: { company_id: companyId } });
        (0, validation_helper_1.validateExists)(company, 'notExists', 'Company not found');
        await this.prisma.company.update({
            where: { company_id: companyId },
            data: { company_logo: url },
        });
    }
    async updateProductImage(productId, url) {
        const product = await this.prisma.companyProduct.findUnique({ where: { company_product_id: productId } });
        (0, validation_helper_1.validateExists)(product, 'notExists', 'Product not found');
        await this.prisma.companyProduct.update({
            where: { company_product_id: productId },
            data: { company_product_img: url },
        });
    }
};
exports.CloudinaryRepository = CloudinaryRepository;
exports.CloudinaryRepository = CloudinaryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CloudinaryRepository);
//# sourceMappingURL=cloudinary.repository.js.map