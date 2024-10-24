import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderProductsDto } from './dtos/createOrderProducts.dto';
import { CompanyRepository } from 'src/companies/companies.repository';
import { CompanyProductsRepository } from 'src/company-products/company-products.repository';
import { OrderRepository } from './orders.repositiry';

@Injectable()
export class OrdersService {

    constructor (
        private readonly companyRepository: CompanyRepository,
        private readonly companyProductRepository: CompanyProductsRepository,
        private readonly orderRepository: OrderRepository,
    ){}


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
}
