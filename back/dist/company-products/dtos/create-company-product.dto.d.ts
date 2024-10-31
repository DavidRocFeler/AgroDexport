export declare class CreateCompanyProductDto {
    company_id: string;
    category_id: string;
    company_product_name: string;
    company_product_description?: string;
    stock: number;
    minimum_order: number;
    origin: string;
    discount: number;
    company_price_x_kg: number;
    harvest_date: string;
    company_product_img: string;
    calories?: number;
    fat?: number;
    protein?: number;
    carbs?: number;
    isActive: boolean;
}
