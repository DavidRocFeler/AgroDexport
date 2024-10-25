import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderProductsDto } from "./dtos/createOrderProducts.dto";
import { CompanyRepository } from "src/companies/companies.repository";
import { AddressesRepository } from "src/addresses/adresses.repository";
import { Order } from "@prisma/client";

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

    async createOrderProductsRepository(createOrderProductsDto: CreateOrderProductsDto) {
        let subtotal = 0;
        const ivaPercentage = 0.19;
        let iva = 0;
        let total = 0;
        const orderStatus = "pending";

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

       
        const productQuantities: { productId: string; quantity: number }[] = [];

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
            throw new ConflictException(`Payment with ID not found.`);
        }

        const shippingAddressId = await this.addressesRepository.findAdressIdByCompanyId(createOrderProductsDto.company_buyer_id);
        if (!shippingAddressId) {
            throw new ConflictException(`Shipping address with ID not found.`);
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
                    throw new ConflictException(`Insufficient stock for product ID ${productId}.`);
                }

              
                await this.prisma.companyProduct.update({
                    where: { company_product_id: productId },
                    data: { stock: product.stock - quantity },
                });
            }

            return {
                order,
                orderDetail
            };
        } catch (error) {
            throw new ConflictException('Failed to create order. Transaction rolled back.');
        }
    }
}
