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
exports.FarmerCertificationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FarmerCertificationRepository = class FarmerCertificationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(certificationData) {
        const { company_product_ids, ...rest } = certificationData;
        try {
            const certification = await this.prisma.farmerCertification.create({
                data: {
                    ...rest,
                    products: {
                        connect: company_product_ids.map(productId => ({
                            company_product_id: productId,
                        })),
                    },
                },
            });
            return certification;
        }
        catch (error) {
            console.error('Error creating Farmer Certification:', error);
            throw new common_1.InternalServerErrorException('An error occurred while creating the Farmer Certification.');
        }
    }
    async findByFarmerId(farmerId) {
        return await this.prisma.farmerCertification.findMany({
            where: { farmer_id: farmerId },
        });
    }
    async update(farmerId, updateData) {
        return await this.prisma.farmerCertification.update({
            where: { farmer_id: farmerId },
            data: updateData,
        });
    }
    async delete(farmerId) {
        return await this.prisma.farmerCertification.delete({
            where: { farmer_id: farmerId },
        });
    }
};
exports.FarmerCertificationRepository = FarmerCertificationRepository;
exports.FarmerCertificationRepository = FarmerCertificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FarmerCertificationRepository);
//# sourceMappingURL=farmer-certifications.repository.js.map