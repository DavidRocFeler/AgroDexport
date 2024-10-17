import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './createCompany.dto';
export declare class CompanyController {
    private readonly companyServices;
    constructor(companyServices: CompanyService);
    getAllCompanies(): Promise<{
        company_id: string;
        user_id: string;
        company_name: string;
        tax_identification_number: number;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        country: string;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string;
        isActive: boolean;
    }[]>;
    getCompanyById(companyId: string): Promise<{
        company_id: string;
        user_id: string;
        company_name: string;
        tax_identification_number: number;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        country: string;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string;
        isActive: boolean;
    }>;
    createCompany(companyData: CreateCompanyDto): Promise<{
        message: string;
        data: {
            company_id: string;
            user_id: string;
            company_name: string;
            tax_identification_number: number;
            address: string;
            postal_code: string;
            city: string;
            state: string;
            country: string;
            industry: string;
            website: string | null;
            account_paypal: string | null;
            company_description: string | null;
            company_logo: string;
            isActive: boolean;
        };
    }>;
    updateCompany(companyId: string, companyData: CreateCompanyDto): Promise<{
        company_id: string;
        user_id: string;
        company_name: string;
        tax_identification_number: number;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        country: string;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string;
        isActive: boolean;
    }>;
    softDeleteCompany(companyId: string): Promise<{
        message: string;
        data: {
            company_id: string;
            user_id: string;
            company_name: string;
            tax_identification_number: number;
            address: string;
            postal_code: string;
            city: string;
            state: string;
            country: string;
            industry: string;
            website: string | null;
            account_paypal: string | null;
            company_description: string | null;
            company_logo: string;
            isActive: boolean;
        };
    }>;
}
