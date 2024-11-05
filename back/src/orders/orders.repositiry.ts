import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderProductsDto } from "./dtos/createOrderProducts.dto";
import { CompanyRepository } from "../companies/companies.repository";
import { AddressesRepository } from "../addresses/adresses.repository";
import { Order } from "@prisma/client";
import { OrderStatus } from "../helpers/orderStatus.enum";
import { NotificationsService } from "../notifications/notifications.service";
import { EmailService } from '../nodemail/nodemail.service';

@Injectable()
export class OrderRepository {
  
     
    constructor (
        private readonly prisma: PrismaService,
        private readonly companyRepository: CompanyRepository,
        private readonly addressesRepository: AddressesRepository,
        private readonly notificationsService: NotificationsService,
        private readonly emailService: EmailService
    ) {}
    
    getAllOrdersRepository(): Promise<Order[]> {
        return this.prisma.order.findMany({
            include: {
                orderDetail: true,
                buyer: {
                    select: {
                        company_name: true,
                        user: {
                            select: {
                                role: {
                                    select: {
                                        role_name: true
                                    }
                                }
                            }
                        }
                    }
                },
                supplier: {
                    select: {
                        company_name: true,
                        user: {
                            select: {
                                role: {
                                    select: {
                                        role_name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    
    

    async getOrdersByBuyerName(buyerName: string): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: {
                buyer: {
                    company_name: {
                        contains: buyerName, 
                        mode: 'insensitive' // Ignora mayúsculas/minúsculas
                    }
                }
            },
            include: {
                orderDetail: true,
                buyer: true,
                supplier: true
            }
        });
    }

    async getOrdersBySupplierName(supplierName: string): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: {
                supplier: {
                    company_name: {
                        contains: supplierName, 
                        mode: 'insensitive' // Ignora mayúsculas/minúsculas
                    }
                }
            },
            include: {
                orderDetail: true,
                buyer: true,
                supplier: true
            }
        });
    }
    
    async findOrderByBuyerSupplierAndTotal(buyerId: string, supplierId: string, total: number): Promise<Order | null> {
        return this.prisma.order.findFirst({
            where: {
                id_company_buy: buyerId,
                id_company_sell: supplierId,
                orderDetail: {
                    total: total,
                  },
                },
                include: {
                  orderDetail: true, 
                },
              });
            }
     
            
            async getOrderByOderDetailIdRepository(orderDetailId: string) {
                
                const orderDeatil = await this.prisma.order.findUnique({
                    where: {order_id: orderDetailId},
                    select: {order_details_id: true,}
                })

                orderDetailId =orderDeatil.order_details_id;
                
                const orderinfo = await this.prisma.producStockOrderDetail.findFirst({
                    where: { order_details_id: orderDetailId },
                    select: {
                        company_product_id: true,
                        stock: true,
                    },
                });
            
                
                if (!orderinfo) {
                    console.error(`Order detail with ID ${orderDetailId} not found.`);
                    throw new Error(`Order detail not found for ID: ${orderDetailId}`);
                }
            
                
                const productId = orderinfo.company_product_id;
                console.log("info product", productId);
            
                
                const infoProduct = await this.prisma.companyProduct.findUnique({
                    where: { company_product_id: productId },
                    select: {
                        company_product_name: true,
                        company_product_description: true,
                        origin: true,
                        company_price_x_kg: true,
                        harvest_date: true,
                        company_product_img: true,
                    },
                });
            
                return {
                    orderinfo,
                    infoProduct,
                };
            }
            
            
    
            async getOrdersByCompanyIdRepository(companyId: string): Promise<Order[]> {
                const orders = await this.prisma.order.findMany({
                    where: {
                        OR: [
                            { id_company_buy: companyId },  
                            { id_company_sell: companyId }  
                        ]
                    },
                    include: {
                        orderDetail: true,
                        buyer: { 
                            select: {
                                company_name: true, 
                            }
                        },
                        supplier: { 
                            select: {
                                company_name: true, 
                            }
                        }
                    }
                });
                return orders;
            }
            
        
        
            async getOrderByIdRepository(orderId: string) {
                return this.prisma.order.findUnique({
                    where: { order_id: orderId },
                    include: {
                        orderDetail: true,
                        buyer: {
                            select: {
                                company_name: true,
                                user: {
                                    select: {
                                        user_id: true,
                                        user_name: true,
                                        credential: {
                                            select: { email: true }
                                        }
                                    }
                                }
                            }
                        },
                        supplier: {
                            select: {
                                company_name: true,
                                user: {
                                    select: {
                                        user_id: true,
                                        user_name: true,
                                        credential: {
                                            select: { email: true }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
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
        const updatedOrder = await this.prisma.order.update({
            where: { order_id: orderId },
            data: {
                orderDetail: {
                    update: { order_status: OrderStatus.finished }
                }
            },
            include: { orderDetail: true }
        });
    
        const orderDetails = await this.getOrderByIdRepository(orderId);
    
        if (orderDetails?.buyer?.user?.user_id) {
            await this.notificationsService.createAndNotifyUser(
                orderDetails.buyer.user.user_id,
                'Your order has been successfully completed.',
                'order_status_update'
            );
            await this.emailService.sendOrderEmail(
                orderDetails.buyer.user.credential.email,
                'Your order has been successfully completed',
                orderDetails.buyer.user.user_name,
                orderDetails.supplier.company_name,
                orderDetails.buyer.company_name,
                orderDetails.orderDetail.subtotal,
                orderDetails.orderDetail.logistic_cost,
                orderDetails.orderDetail.tariff,
                orderDetails.orderDetail.tax,
                orderDetails.orderDetail.discount,
                orderDetails.orderDetail.total,
                'buyer'
            )
        }
    
        if (orderDetails?.supplier?.user?.user_id) {
            await this.notificationsService.createAndNotifyUser(
                orderDetails.supplier.user.user_id,
                'You have received a new purchase order. Please check your order history.',
                'order_status_update'
            );
            await this.emailService.sendOrderEmail(
                orderDetails.supplier.user.credential.email,
                'You have received a new purchase order',
                orderDetails.supplier.user.user_name,
                orderDetails.supplier.company_name,
                orderDetails.buyer.company_name,
                orderDetails.orderDetail.subtotal,
                orderDetails.orderDetail.logistic_cost,
                orderDetails.orderDetail.tariff,
                orderDetails.orderDetail.tax,
                orderDetails.orderDetail.discount,
                orderDetails.orderDetail.total,
                'supplier'
            )
        }
        
        return updatedOrder;
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