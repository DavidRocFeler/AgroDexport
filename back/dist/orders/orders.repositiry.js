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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const companies_repository_1 = require("../companies/companies.repository");
const adresses_repository_1 = require("../addresses/adresses.repository");
const orderStatus_enum_1 = require("../helpers/orderStatus.enum");
let OrderRepository = class OrderRepository {
    constructor(prisma, companyRepository, addressesRepository) {
        this.prisma = prisma;
        this.companyRepository = companyRepository;
        this.addressesRepository = addressesRepository;
    }
    getAllOrdersRepository() {
        return this.prisma.order.findMany({
            include: { orderDetail: true }
        });
    }
    async getOrderByIdRepository(orderId) {
        return this.prisma.order.findUnique({
            where: { order_id: orderId },
            include: { orderDetail: true }
        });
    }
    async createOrderProductsRepository(createOrderProductsDto) {
        let subtotal = 0;
        const ivaPercentage = 0.19;
        let iva = 0;
        let total = 0;
        const orderStatus = orderStatus_enum_1.OrderStatus.Pending;
        const productQuantities = [];
        const roundToTwoDecimals = (num) => {
            return Math.round(num * 100) / 100;
        };
        const calculateProductTotal = async (productId, quantity) => {
            const product = await this.prisma.companyProduct.findUnique({
                where: { company_product_id: productId },
                select: { company_price_x_kg: true, discount: true, stock: true },
            });
            if (!product) {
                throw new common_1.ConflictException(`Product with ID ${productId} not found.`);
            }
            return roundToTwoDecimals(product.company_price_x_kg * (quantity * 1000)) * ((100 - product.discount) / 100);
        };
        if (createOrderProductsDto.product_one_id) {
            const quantity = createOrderProductsDto.quantity_product_one;
            subtotal += await calculateProductTotal(createOrderProductsDto.product_one_id, quantity);
            productQuantities.push({ productId: createOrderProductsDto.product_one_id, quantity });
        }
        if (createOrderProductsDto.product_two_id) {
            const quantity = createOrderProductsDto.quantity_product_two;
            subtotal += await calculateProductTotal(createOrderProductsDto.product_two_id, quantity);
            productQuantities.push({ productId: createOrderProductsDto.product_two_id, quantity });
        }
        if (createOrderProductsDto.product_three_id) {
            const quantity = createOrderProductsDto.quantity_product_three;
            subtotal += await calculateProductTotal(createOrderProductsDto.product_three_id, quantity);
            productQuantities.push({ productId: createOrderProductsDto.product_three_id, quantity });
        }
        if (createOrderProductsDto.product_four_id) {
            const quantity = createOrderProductsDto.quantity_product_four;
            subtotal += await calculateProductTotal(createOrderProductsDto.product_four_id, quantity);
            productQuantities.push({ productId: createOrderProductsDto.product_four_id, quantity });
        }
        if (createOrderProductsDto.product_five_id) {
            const quantity = createOrderProductsDto.quantity_product_five;
            subtotal += await calculateProductTotal(createOrderProductsDto.product_five_id, quantity);
            productQuantities.push({ productId: createOrderProductsDto.product_five_id, quantity });
        }
        iva = roundToTwoDecimals(subtotal * ivaPercentage);
        total = roundToTwoDecimals(subtotal + iva);
        const paymentsAccount = await this.companyRepository.findByAcoountPaypalById(createOrderProductsDto.company_supplier_id);
        if (!paymentsAccount) {
            throw new common_1.ConflictException(`Payment with ID not found.`);
        }
        const shippingAddressId = await this.addressesRepository.findAdressIdByCompanyId(createOrderProductsDto.company_buyer_id);
        if (!shippingAddressId) {
            throw new common_1.ConflictException(`Shipping address with ID not found.`);
        }
        try {
            const orderDetail = await this.prisma.orderDetail.create({
                data: {
                    iva: iva,
                    total: total,
                    order_status: orderStatus,
                },
            });
            const order = await this.prisma.order.create({
                data: {
                    id_company_sell: createOrderProductsDto.company_supplier_id,
                    id_company_buy: createOrderProductsDto.company_buyer_id,
                    account_paypal: paymentsAccount,
                    shipping_address_id: shippingAddressId,
                    order_details_id: orderDetail.order_details_id,
                    order_date: new Date(),
                },
            });
            for (const { productId, quantity } of productQuantities) {
                const product = await this.prisma.companyProduct.findUnique({
                    where: { company_product_id: productId },
                    select: { stock: true },
                });
                if (!product || product.stock < quantity) {
                    await this.prisma.order.delete({ where: { order_id: order.order_id } });
                    await this.prisma.orderDetail.delete({ where: { order_details_id: orderDetail.order_details_id } });
                    throw new common_1.ConflictException(`Insufficient stock for product ID ${productId}.`);
                }
                await this.prisma.companyProduct.update({
                    where: { company_product_id: productId },
                    data: { stock: product.stock - quantity },
                });
                await this.prisma.producStockOrderDetail.create({
                    data: {
                        order_details_id: order.order_details_id,
                        company_product_id: productId,
                        stock: quantity,
                    },
                });
            }
            return {
                order,
                orderDetail
            };
        }
        catch (error) {
            throw new common_1.ConflictException('Failed to create order. Transaction rolled back.', error.message);
        }
    }
    async updateOrderStatusRepository(orderId) {
        return this.prisma.order.update({
            where: { order_id: orderId },
            data: {
                orderDetail: {
                    update: { order_status: orderStatus_enum_1.OrderStatus.finished }
                }
            },
            include: { orderDetail: true }
        });
    }
    async softDeleteOrderRepository(orderId) {
        const orderDetail = await this.prisma.order.findUnique({
            where: { order_id: orderId },
            select: { order_details_id: true },
        });
        const orderDetailsId = orderDetail.order_details_id;
        const orderDetails = await this.prisma.producStockOrderDetail.findMany({
            where: { order_details_id: orderDetailsId },
            select: {
                company_product_id: true,
                stock: true,
            },
        });
        if (!orderDetails.length) {
            throw new Error('No order details found for this order');
        }
        const updatePromises = orderDetails.map(async (detail) => {
            const { company_product_id, stock } = detail;
            await this.prisma.companyProduct.update({
                where: { company_product_id: company_product_id },
                data: {
                    stock: {
                        increment: stock,
                    },
                },
            });
        });
        await Promise.all(updatePromises);
        await this.prisma.order.update({
            where: { order_id: orderId },
            data: { orderDetail: { update: { order_status: orderStatus_enum_1.OrderStatus.Canceled } } }
        });
        const order = await this.prisma.order.findUnique({
            where: { order_id: orderId },
            include: { orderDetail: true, }
        });
        return order;
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        companies_repository_1.CompanyRepository,
        adresses_repository_1.AddressesRepository])
], OrderRepository);
//# sourceMappingURL=orders.repositiry.js.map