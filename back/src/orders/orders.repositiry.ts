import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderProductsDto } from "./dtos/createOrderProducts.dto";
import { CompanyRepository } from "src/companies/companies.repository";
import { AddressesRepository } from "src/addresses/adresses.repository";
import { Order } from "@prisma/client";
import { OrderStatus } from "src/helpers/orderStatus.enum";

@Injectable()
export class OrderRepository {
    

    constructor (
        private readonly prisma: PrismaService,
        private readonly companyRepository: CompanyRepository,
        private readonly addressesRepository: AddressesRepository
    ) {}
    
    getAllOrdersRepository(): Promise<Order[]> {
        return this.prisma.order.findMany({
            include: { orderDetail: true}
        })
    }
    
    async getOrderByIdRepository(orderId: string) {
        return this.prisma.order.findUnique({
            where: {order_id: orderId },
            include: {orderDetail: true}
        })
    }
    async createOrderProductsRepository(createOrderProductsDto: CreateOrderProductsDto) {
        let {subtotal, logistic_cost, tariff, tax, discount, total } = createOrderProductsDto
        const orderStatus = OrderStatus.Pending;
        const productQuantities: { productId: string; quantity: number }[] = [];

        const roundToTwoDecimals = (num: number): number => {
            return Math.round(num * 100) / 100;
        };

        const calculateProductTotal = async (productId: string, quantity: number): Promise<number> => {
            const product = await this.prisma.companyProduct.findUnique({
                where: { company_product_id: productId },
                select: { company_price_x_kg: true, discount: true, stock: true }, 
            });
            if (!product) {
                throw new ConflictException(`Product with ID ${productId} not found.`);
            }
            return roundToTwoDecimals(product.company_price_x_kg * (quantity * 1000)) * ((100 - product.discount) / 100);
        };


        if (createOrderProductsDto.product_one_id) {
            const quantity = createOrderProductsDto.quantity_product_one;
            productQuantities.push({ productId: createOrderProductsDto.product_one_id, quantity });
        }
        if (createOrderProductsDto.product_two_id) {
            const quantity = createOrderProductsDto.quantity_product_two;
            productQuantities.push({ productId: createOrderProductsDto.product_two_id, quantity });
        }
        if (createOrderProductsDto.product_three_id) {
            const quantity = createOrderProductsDto.quantity_product_three;
            productQuantities.push({ productId: createOrderProductsDto.product_three_id, quantity });
        }
        if (createOrderProductsDto.product_four_id) {
            const quantity = createOrderProductsDto.quantity_product_four;
            productQuantities.push({ productId: createOrderProductsDto.product_four_id, quantity });
        }
        if (createOrderProductsDto.product_five_id) {
            const quantity = createOrderProductsDto.quantity_product_five;
            productQuantities.push({ productId: createOrderProductsDto.product_five_id, quantity });
        }

        subtotal = roundToTwoDecimals(subtotal);
        logistic_cost = roundToTwoDecimals(logistic_cost);
        tariff = roundToTwoDecimals(tariff);
        tax = roundToTwoDecimals(tax);
        discount = roundToTwoDecimals(discount);
        total = roundToTwoDecimals(total);        

        const paymentsAccount = await this.companyRepository.findByAcoountPaypalById(createOrderProductsDto.company_supplier_id);
        if (!paymentsAccount) {
            throw new ConflictException(`Payment with ID not found.`);
        }

        // const shippingAddressId = await this.addressesRepository.findAdressIdByCompanyId(createOrderProductsDto.company_buyer_id);
        // if (!shippingAddressId) {
        //     throw new ConflictException(`Shipping address with ID not found.`);
        // }

        try {
            
            const orderDetail = await this.prisma.orderDetail.create({
                data: {
                    subtotal: subtotal,
                    logistic_cost: logistic_cost,
                    tariff: tariff,
                    tax: tax,
                    discount: discount,
                    total: total,
                    order_status: orderStatus,
                },
            });

            const order = await this.prisma.order.create({
                data: {
                    id_company_sell: createOrderProductsDto.company_supplier_id,
                    id_company_buy: createOrderProductsDto.company_buyer_id,
                    account_paypal: paymentsAccount,
                    // shipping_address_id: shippingAddressId,
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
                    throw new ConflictException(`Insufficient stock for product ID ${productId}.`);
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
        } catch (error) {
            throw new ConflictException('Failed to create order. Transaction rolled back.', error.message);
        }
    }

    async updateOrderStatusRepository(orderId: string) {
        return this.prisma.order.update({
            where: { order_id: orderId },
            data: {
                orderDetail: {
                    update: { order_status: OrderStatus.finished }
                }
            },
            include: { orderDetail: true }
        });
    }
    

    async softDeleteOrderRepository(orderId: string) {
        
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
            data: { orderDetail: { update: { order_status: OrderStatus.Canceled } } }
        });
        
        const order = await this.prisma.order.findUnique({
            where: { order_id: orderId },
            include: { orderDetail: true, }        
        });
        return order
    }
    
}
