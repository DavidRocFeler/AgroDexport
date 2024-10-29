import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderProductsDto } from "./dtos/createOrderProducts.dto";
import { CompanyRepository } from "src/companies/companies.repository";
import { AddressesRepository } from "src/addresses/adresses.repository";
import { Order } from "@prisma/client";
export declare class OrderRepository {
    private readonly prisma;
    private readonly companyRepository;
    private readonly addressesRepository;
    constructor(prisma: PrismaService, companyRepository: CompanyRepository, addressesRepository: AddressesRepository);
    getAllOrdersRepository(): Promise<Order[]>;
    getOrderByIdRepository(orderId: string): Promise<{
        orderDetail: {
            order_details_id: string;
            iva: number;
            total: number;
            order_status: string;
        };
    } & {
        account_paypal: string | null;
        order_id: string;
        supply_chain_id: string | null;
        order_details_id: string;
        id_company_sell: string;
        shipping_address_id: string | null;
        order_date: Date;
        payment_id: string | null;
        id_company_buy: string;
    }>;
    createOrderProductsRepository(createOrderProductsDto: CreateOrderProductsDto): Promise<{
        order: {
            account_paypal: string | null;
            order_id: string;
            supply_chain_id: string | null;
            order_details_id: string;
            id_company_sell: string;
            shipping_address_id: string | null;
            order_date: Date;
            payment_id: string | null;
            id_company_buy: string;
        };
        orderDetail: {
            order_details_id: string;
            iva: number;
            total: number;
            order_status: string;
        };
    }>;
    updateOrderStatusRepository(orderId: string): Promise<{
        orderDetail: {
            order_details_id: string;
            iva: number;
            total: number;
            order_status: string;
        };
    } & {
        account_paypal: string | null;
        order_id: string;
        supply_chain_id: string | null;
        order_details_id: string;
        id_company_sell: string;
        shipping_address_id: string | null;
        order_date: Date;
        payment_id: string | null;
        id_company_buy: string;
    }>;
    softDeleteOrderRepository(orderId: string): Promise<{
        orderDetail: {
            order_details_id: string;
            iva: number;
            total: number;
            order_status: string;
        };
    } & {
        account_paypal: string | null;
        order_id: string;
        supply_chain_id: string | null;
        order_details_id: string;
        id_company_sell: string;
        shipping_address_id: string | null;
        order_date: Date;
        payment_id: string | null;
        id_company_buy: string;
    }>;
}
