import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderProductsDto } from './dtos/createOrderProducts.dto';
import { CompanyRepository } from '../companies/companies.repository';
import { CompanyProductsRepository } from '../company-products/company-products.repository';
import { OrderRepository } from './orders.repositiry';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '../helpers/orderStatus.enum';
import * as ordersData from '../assets/orders.json';
import * as paymentsFinishedData from '../assets/paymentsFinished.json';
import * as paymentsCancelData from '../assets/paymentsCancel.json';

interface OrderData {
    company_buyer_name: string;
    company_supplier_name: string;
    product_one_name: string;
    quantity_product_one: number;
    subtotal: number;
    logistic_cost: number;
    tariff: number;
    tax: number;
    discount: number;
    total: number;
    order_status?: boolean;
    product_two_name?: string;
    quantity_product_two?: number;
    product_three_name?: string;
    quantity_product_three?: number;
    product_four_name?: string;
    quantity_product_four?: number;
    product_five_name?: string;
    quantity_product_five?: number;
}

@Injectable()
export class OrdersService {
    
    
    
    constructor (
        private readonly companyRepository: CompanyRepository,
        private readonly companyProductRepository: CompanyProductsRepository,
        private readonly orderRepository: OrderRepository,
        private readonly prisma: PrismaService
    ){}

    async getAllOrdersServices(): Promise<Order[]> {
        return this.orderRepository.getAllOrdersRepository()
    }

    async getOrderByIdService(orderId: string) {
        return this.orderRepository.getOrderByIdRepository(orderId);
    }

    async getOrdersByCompanyIdServices(companyId: string): Promise<Order[]> {
        const companyExists  = await this.companyRepository.findById(companyId)
        if(!companyExists){
            throw new ForbiddenException('The company does not exist');
        }
        return this.orderRepository.getOrdersByCompanyIdRepository(companyId);
    }

    getInfoOrderByOderDetailIdServices(ordeDatailId: string) {
        return this.orderRepository.getOrderByOderDetailIdRepository(ordeDatailId
        )
    }

    async createOrderProductsServices(createOrderProductsDto: CreateOrderProductsDto) {
        const companyBuyer = await this.companyRepository.findById(createOrderProductsDto.company_buyer_id)
        const companySeller = await this.companyRepository.findById(createOrderProductsDto.company_supplier_id)

        if(companyBuyer.user.role.role_name !== "buyer"){
            throw new ForbiddenException('The company is not a buyer'); 
        }

        if(companySeller.user.role.role_name !=="supplier"){
            throw new ForbiddenException('The company is not a supplier');
        }

        const validateProduct = async (productId: string, quantity: number, productName: string) => {
            const minimumOrder = await this.companyProductRepository.findByIdMinimumOrder(productId);
            const stockProduct = await this.companyProductRepository.findByIdStock(productId);
    
            if (quantity < minimumOrder) {
                throw new ConflictException(`The quantity for ${productName} is less than the minimum sales order.`);
            }
    
            if (quantity > stockProduct) {
                throw new ConflictException(`The quantity for ${productName} exceeds the available stock.`);
            }
        };
    
        if (createOrderProductsDto.product_one_id) {
            await validateProduct(createOrderProductsDto.product_one_id, createOrderProductsDto.quantity_product_one, 'product one');
        }
        if (createOrderProductsDto.product_two_id) {
            await validateProduct(createOrderProductsDto.product_two_id, createOrderProductsDto.quantity_product_two, 'product two');
        }
        if (createOrderProductsDto.product_three_id) {
            await validateProduct(createOrderProductsDto.product_three_id, createOrderProductsDto.quantity_product_three, 'product three');
        }
        if (createOrderProductsDto.product_four_id) {
            await validateProduct(createOrderProductsDto.product_four_id, createOrderProductsDto.quantity_product_four, 'product four');
        }
        if (createOrderProductsDto.product_five_id) {
            await validateProduct(createOrderProductsDto.product_five_id, createOrderProductsDto.quantity_product_five, 'product five');
        }

        return this.orderRepository.createOrderProductsRepository(createOrderProductsDto)
    }

    async updateOderStatusService(orderId: string) {
        const order = await this.prisma.order.findUnique({
            where: {order_id: orderId },
            include: { orderDetail: true }
        })

        if(!order){
            throw new ForbiddenException('The order does not exist');
        }

        if (order.orderDetail.order_status === OrderStatus.finished){
            throw new ForbiddenException('The order is already finished');
        }

        if(order.orderDetail.order_status === OrderStatus.Canceled){
            throw new ForbiddenException('The order is already canceled');
        }

        return this.orderRepository.updateOrderStatusRepository(orderId)
    }

    async softDleteOrderService(orderId: string) {
        const order = await this.prisma.order.findUnique({
            where: {order_id: orderId },
            include: { orderDetail: true }
        })

        if(!order){
            throw new ForbiddenException('The order does not exist');
        }

        if (order.orderDetail.order_status === OrderStatus.finished){
            throw new ForbiddenException('The order is already finished');
        }

        if(order.orderDetail.order_status === OrderStatus.Canceled){
            throw new ForbiddenException('The order is already canceled');
        }

        return this.orderRepository.softDeleteOrderRepository(orderId)
    }



    
    async preloadOrdersService(): Promise<{ order: string; status: string }[]> {
        const results: { order: string; status: string }[] = [];
      
        for (const orderData of ordersData as OrderData[]) {  // <-- Aquí se especifica el tipo
            const buyerCompany = await this.companyRepository.findByName(orderData.company_buyer_name);
            if (!buyerCompany) {
                results.push({ order: orderData.company_buyer_name, status: 'Buyer Company not found' });
                continue;
            }
    
            const supplierCompany = await this.companyRepository.findByName(orderData.company_supplier_name);
            if (!supplierCompany) {
                results.push({ order: orderData.company_supplier_name, status: 'Supplier Company not found' });
                continue;
            }
    
            const productOne = await this.companyProductRepository.findByProductNameAndCompanyId(orderData.product_one_name, supplierCompany.company_id);
            if (!productOne) {
                results.push({ order: orderData.product_one_name, status: 'Product One not found' });
                continue;
            }
    
            let productTwo, productThree, productFour, productFive;
    
            if (orderData.product_two_name) {
                productTwo = await this.companyProductRepository.findByProductNameAndCompanyId(orderData.product_two_name, supplierCompany.company_id);
                if (!productTwo) {
                    results.push({ order: orderData.product_two_name, status: 'Product Two not found' });
                    continue;
                }
            }
    
            if (orderData.product_three_name) {
                productThree = await this.companyProductRepository.findByProductNameAndCompanyId(orderData.product_three_name, supplierCompany.company_id);
                if (!productThree) {
                    results.push({ order: orderData.product_three_name, status: 'Product Three not found' });
                    continue;
                }
            }
    
            if (orderData.product_four_name) {
                productFour = await this.companyProductRepository.findByProductNameAndCompanyId(orderData.product_four_name, supplierCompany.company_id);
                if (!productFour) {
                    results.push({ order: orderData.product_four_name, status: 'Product Four not found' });
                    continue;
                }
            }
    
            if (orderData.product_five_name) {
                productFive = await this.companyProductRepository.findByProductNameAndCompanyId(orderData.product_five_name, supplierCompany.company_id);
                if (!productFive) {
                    results.push({ order: orderData.product_five_name, status: 'Product Five not found' });
                    continue;
                }
            }
    
            const { company_buyer_name, company_supplier_name, product_one_name, product_two_name, product_three_name, product_four_name, product_five_name, 
              ...orderWithoutExtra } = orderData;
    
            const productsCount = [
                productOne,
                productTwo,
                productThree,
                productFour,
                productFive
            ].filter(product => product !== undefined).length;
            
            const orderFinal = { 
                ...orderWithoutExtra, 
                company_buyer_id: buyerCompany.company_id,
                company_supplier_id: supplierCompany.company_id,
                product_one_id: productOne.company_product_id,
                product_two_id: productTwo?.company_product_id,
                product_three_id: productThree?.company_product_id,
                product_four_id: productFour?.company_product_id,
                product_five_id: productFive?.company_product_id,
                productsCount // Agregado para cumplir con el DTO
            };

            const existingOrder = await this.orderRepository.findOrderByBuyerSupplierAndTotal(
                buyerCompany.company_id,
                supplierCompany.company_id,
                orderFinal.total
            );
    
            if (existingOrder) {
                results.push({ order: orderData.company_buyer_name, status: 'Order already exists' });
                continue;
            }
            
            results.push({ order: orderData.company_buyer_name, status: 'Created' });
            await this.orderRepository.createOrderProductsRepository(orderFinal);
        }
    
        return results;
    }
    
    async preloadPaymentsFinished(): Promise<{ paymentFinished: string; status: string }[]> {
        const results: { paymentFinished: string; status: string }[] = [];
    
        for (const paymentFinishedData of paymentsFinishedData) {
            const buyerCompany = await this.companyRepository.findByName(paymentFinishedData.company_buyer_name);
            if (!buyerCompany) {
                results.push({ paymentFinished: paymentFinishedData.company_buyer_name, status: 'Buyer Company not found' });
                continue;
            }
    
            const supplierCompany = await this.companyRepository.findByName(paymentFinishedData.company_supplier_name);
            if (!supplierCompany) {
                results.push({ paymentFinished: paymentFinishedData.company_supplier_name, status: 'Supplier Company not found' });
                continue;
            }
    
            const existingOrder = await this.orderRepository.findOrderByBuyerSupplierAndTotal(
                buyerCompany.company_id,
                supplierCompany.company_id,
                paymentFinishedData.total,
            );
    
            if (!existingOrder) {
                results.push({ paymentFinished: paymentFinishedData.company_buyer_name, status: 'Order not found' });
                continue;
            }

            const order = await this.prisma.order.findUnique({
                where: {order_id: existingOrder.order_id },
                include: { orderDetail: true }
            })
    
            if (order.orderDetail.order_status === OrderStatus.finished){
                results.push({ paymentFinished: paymentFinishedData.company_supplier_name, status: 'Order is already Finished' });
                continue;
            }
    
            if(order.orderDetail.order_status === OrderStatus.Canceled){
                results.push({ paymentFinished: paymentFinishedData.company_supplier_name, status: 'Order is already Cancelled' });
                continue;
            }
    
            await this.updateOderStatusService(existingOrder.order_id);
            results.push({
                paymentFinished: paymentFinishedData.company_buyer_name,
                status: 'Order updated to finished',
            });
        }
    
        return results;
    }
    
    
    async preloadPaymentsCancel(): Promise<{ paymentCancel: string; status: string }[]> {
        const results: { paymentCancel: string; status: string }[] = [];

        for (const paymentCancelData of paymentsCancelData) {
            const buyerCompany = await this.companyRepository.findByName(paymentCancelData.company_buyer_name);
            if (!buyerCompany) {
                results.push({ paymentCancel: paymentCancelData.company_buyer_name, status: 'Buyer Company not found' });
                continue;
            }
    
            const supplierCompany = await this.companyRepository.findByName(paymentCancelData.company_supplier_name);
            if (!supplierCompany) {
                results.push({ paymentCancel: paymentCancelData.company_supplier_name, status: 'Supplier Company not found' });
                continue;
            }


            const existingOrder = await this.orderRepository.findOrderByBuyerSupplierAndTotal(
                buyerCompany.company_id,
                supplierCompany.company_id,
                paymentCancelData.total,
            );

            if (!existingOrder) {
                results.push({ paymentCancel: paymentCancelData.company_buyer_name, status: 'Order not found' });
                continue;
            }

            const order = await this.prisma.order.findUnique({
                where: {order_id: existingOrder.order_id },
                include: { orderDetail: true }
            })
    
            if (order.orderDetail.order_status === OrderStatus.finished){
                results.push({ paymentCancel: paymentCancelData.company_supplier_name, status: 'Order is already Finished' });
                continue;
            }
    
            if(order.orderDetail.order_status === OrderStatus.Canceled){
                results.push({ paymentCancel: paymentCancelData.company_supplier_name, status: 'Order is already Cancelled' });
                continue;
            }

            if (existingOrder) {
                await this.softDleteOrderService(existingOrder.order_id);
                results.push({
                    paymentCancel: paymentCancelData.company_buyer_name,
                    status: 'Order updated to Cancelled',
                });
            } else {
                results.push({
                    paymentCancel: paymentCancelData.company_buyer_name,
                    status: 'Order not found',
                });
            }
        }
        return results;
    }
   
}
