import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './createCompany.dto';
import { UpdateCompanyDto } from './updateCompany.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { Company } from '@prisma/client';
export declare class CompanyRepository {
    private readonly notificationsService;
    private readonly prisma;
    constructor(notificationsService: NotificationsService, prisma: PrismaService);
    getAll(): Promise<any[]>;
    getWithFilters(filters: any[]): Promise<Company[]>;
    findById(companyId: string): Promise<{
        user: {
            role: {
                role_name: string;
                role_id: string;
                role_description: string;
            };
        } & {
            user_name: string;
            user_lastname: string;
            isOlder: boolean;
            user_id: string;
            nDni: number | null;
            birthday: string | null;
            phone: string | null;
            country: string | null;
            profile_picture: string | null;
            role_id: string;
            credential_id: string | null;
        };
    } & {
        user_id: string;
        country: string;
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
        company_logo: string | null;
        isActive: boolean;
        company_id: string;
    }>;
    findByName(companyName: string): Promise<{
        user: {
            role: {
                role_name: string;
                role_id: string;
                role_description: string;
            };
        } & {
            user_name: string;
            user_lastname: string;
            isOlder: boolean;
            user_id: string;
            nDni: number | null;
            birthday: string | null;
            phone: string | null;
            country: string | null;
            profile_picture: string | null;
            role_id: string;
            credential_id: string | null;
        };
    } & {
        user_id: string;
        country: string;
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
        company_logo: string | null;
        isActive: boolean;
        company_id: string;
    }>;
    create(companyData: CreateCompanyDto): Promise<{
        user_id: string;
        country: string;
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
        company_logo: string | null;
        isActive: boolean;
        company_id: string;
    }>;
    update(companyId: string, companyData: UpdateCompanyDto): Promise<{
        user_id: string;
        country: string;
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
        company_logo: string | null;
        isActive: boolean;
        company_id: string;
    }>;
    softDelete(companyId: string): Promise<{
        user_id: string;
        country: string;
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
        company_logo: string | null;
        isActive: boolean;
        company_id: string;
    }>;
    findByAcoountPaypalById(company_supplier_id: string): Promise<string>;
}
