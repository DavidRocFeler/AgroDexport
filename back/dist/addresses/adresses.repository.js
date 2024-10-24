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
exports.AddressesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AddressesRepository = class AddressesRepository {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async getAll() {
        return this.prisma.shippingAddress.findMany({
            include: {
                company: true,
            },
        });
    }
    async getWithFilters(filters) {
        return this.prisma.shippingAddress.findMany({
            where: {
                AND: filters,
            },
            include: {
                company: {
                    include: {
                        user: {
                            include: {
                                credential: {
                                    select: {
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    async findById(addressId) {
        const address = await this.prisma.shippingAddress.findUnique({
            where: { shipping_address_id: addressId },
            include: {
                company: {
                    include: {
                        user: {
                            select: {
                                user_id: true,
                            },
                        },
                    },
                },
            },
        });
        if (!address || !address.isActive) {
            throw new common_1.NotFoundException('Address not found');
        }
        const userId = address.company?.user?.user_id;
        return { ...address, userId };
    }
    async findByAddress(address) {
        const shippingAddress = await this.prisma.shippingAddress.findFirst({
            where: { address },
            include: {
                company: {
                    select: {
                        company_name: true,
                    },
                },
            },
        });
        return shippingAddress;
    }
    async updateAddress(addressId, addressData) {
        const address = await this.findById(addressId);
        const userId = address.company?.user?.user_id;
        if (!userId) {
            throw new common_1.NotFoundException('User not found for the given address.');
        }
        const updatedAddress = await this.prisma.shippingAddress.update({
            where: { shipping_address_id: addressId },
            data: addressData,
        });
        if (updatedAddress) {
            await this.notificationService.createAndNotifyUser(userId, 'Your address has been updated.', 'ShippingAddressUpdate');
        }
        return updatedAddress;
    }
    async create(shippingAddressData) {
        const data = {
            ...shippingAddressData,
            isActive: true,
        };
        return this.prisma.shippingAddress.create({ data });
    }
    async softDelete(addressId) {
        await this.findById(addressId);
        return this.prisma.shippingAddress.update({
            where: { shipping_address_id: addressId },
            data: { isActive: false },
        });
    }
};
exports.AddressesRepository = AddressesRepository;
exports.AddressesRepository = AddressesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], AddressesRepository);
//# sourceMappingURL=adresses.repository.js.map