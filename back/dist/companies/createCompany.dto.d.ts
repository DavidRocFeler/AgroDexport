export declare class CreateCompanyDto {
    user_id: string;
    company_name: string;
    tax_identification_number: number;
    address: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
    industry: string;
    website?: string;
    account_paypal: string;
    company_description?: string;
    company_logo: string;
    isActive: boolean;
}
