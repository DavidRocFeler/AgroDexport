import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './createCompany.dto';
export declare class CompanyController {
    private readonly companyServices;
    constructor(companyServices: CompanyService);
    getAllCompanies(): Promise<{
        country: string;
        user_id: string;
        company_name: string;
        tax_identification_number: number;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string;
        isActive: boolean;
        company_id: string;
    }[]>;
    getCompanyById(companyId: string): Promise<{
        country: string;
        user_id: string;
        company_name: string;
        tax_identification_number: number;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string;
        isActive: boolean;
        company_id: string;
    }>;
    createCompany(companyData: CreateCompanyDto): Promise<{
        message: string;
        data: {
            country: string;
            user_id: string;
            company_name: string;
            tax_identification_number: number;
            address: string;
            postal_code: string;
            city: string;
            state: string;
            industry: string;
            website: string | null;
            account_paypal: string | null;
            company_description: string | null;
            company_logo: string;
            isActive: boolean;
            company_id: string;
        };
    }>;
    updateCompany(companyId: string, companyData: CreateCompanyDto): Promise<{
        country: string;
        user_id: string;
        company_name: string;
        tax_identification_number: number;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string;
        isActive: boolean;
        company_id: string;
    }>;
    softDeleteCompany(companyId: string): Promise<{
        message: string;
        data: {
            country: string;
            user_id: string;
            company_name: string;
            tax_identification_number: number;
            address: string;
            postal_code: string;
            city: string;
            state: string;
            industry: string;
            website: string | null;
            account_paypal: string | null;
            company_description: string | null;
            company_logo: string;
            isActive: boolean;
            company_id: string;
        };
    }>;
}
