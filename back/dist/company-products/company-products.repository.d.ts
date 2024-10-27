import { PrismaService } from '../prisma/prisma.service';
import { Company, CompanyProduct } from '@prisma/client';
import { CreateCompanyProductDto } from './dtos/create-company-product.dto';
import { UpdateCompanyProductDto } from './dtos/update-company-product.dto';
import { NotificationsService } from '../notifications/notifications.service';

export declare class CompanyProductsRepository {
    private readonly prisma;
    private readonly notificationsService;

    constructor(prisma: PrismaService, notificationsService: NotificationsService) {}

    findAll(): Promise<CompanyProduct[]> {}

    findProductsWithoutFarmer(): Promise<any[]> {}

    findProductsWithIncompleteCertifications(): Promise<any[]> {
    }

    findAllByCompanyId(companyId: string): Promise<{
        company_product_id: string;
        farmer_id: string | null;
        company_id: string;
        category_id: string;
        order_details_id: string | null;
        company_product_name: string;
        company_product_description: string | null;
        stock: number;
        minimum_order: number;
        discount: number;
        origin: string;
        company_price_x_kg: number;
        total_price: number;
        harvest_date: Date;
        company_product_img: string;
        calories: number | null;
        fat: number | null;
        protein: number | null;
        carbs: number | null;
        isActive: boolean;
    }[]> {

    }

    findProductByIdRepository(companyId: string, productId: string): Promise<{
        farmerCertification: {
            farmer_id: string;
            phytosanitary_certificate: string;
            agricultural_producer_cert: string;
            organic_certification: string | null;
            quality_certificate: string;
            certificate_of_origin: string;
        };
    } & {
        company_product_id: string;
        farmer_id: string | null;
        company_id: string;
        category_id: string;
        order_details_id: string | null;
        company_product_name: string;
        company_product_description: string | null;
        stock: number;
        minimum_order: number;
        discount: number;
        origin: string;
        company_price_x_kg: number;
        total_price: number;
        harvest_date: Date;
        company_product_img: string;
        calories: number | null;
        fat: number | null;
        protein: number | null;
        carbs: number | null;
        isActive: boolean;
    }> {

    }

    createProductRepository(createCompanyProductDto: CreateCompanyProductDto): Promise<CompanyProduct> {

    }

    updateProductRepository(productId: string, productData: UpdateCompanyProductDto): Promise<{
        company_product_id: string;
        farmer_id: string | null;
        company_id: string;
        category_id: string;
        order_details_id: string | null;
        company_product_name: string;
        company_product_description: string | null;
        stock: number;
        minimum_order: number;
        discount: number;
        origin: string;
        company_price_x_kg: number;
        total_price: number;
        harvest_date: Date;
        company_product_img: string;
        calories: number | null;
        fat: number | null;
        protein: number | null;
        carbs: number | null;
        isActive: boolean;
    }> {

    }

    findByProductNameAndCompanyId(productName: string, companyId: string): Promise<(CompanyProduct & { company: Company }) | null> {

    }

    findProductById(productId: string): Promise<{ isActive: boolean }> {

    }

    findProductsByIds(companyproductsIds: string[]): Promise<CompanyProduct[]> {

    }

    softDeleteProductRepository(productId: string): Promise<{
        company_product_id: string;
        farmer_id: string | null;
        company_id: string;
        category_id: string;
        order_details_id: string | null;
        company_product_name: string;
        company_product_description: string | null;
        stock: number;
        minimum_order: number;
        discount: number;
        origin: string;
        company_price_x_kg: number;
        total_price: number;
        harvest_date: Date;
        company_product_img: string;
        calories: number | null;
        fat: number | null;
        protein: number | null;
        carbs: number | null;
        isActive: boolean;
    }> {

    }

    findByIdMinimumOrder(product_one_id: string): Promise<number> {

    }

    findByIdStock(product_one_id: string): Promise<number> {

    }
}

