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
                role_id: string;
                role_name: string;
                role_description: string;
            };
        } & {
            user_id: string;
            country: string | null;
            user_name: string;
            user_lastname: string;
            nDni: number | null;
            birthday: string | null;
            phone: string | null;
            profile_picture: string | null;
            isOlder: boolean;
            role_id: string;
            credential_id: string | null;
        };
    } & {
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
        company_logo: string | null;
        isActive: boolean;
    }>;
    findByName(companyName: string): Promise<{
        user: {
            role: {
                role_id: string;
                role_name: string;
                role_description: string;
            };
        } & {
            user_id: string;
            country: string | null;
            user_name: string;
            user_lastname: string;
            nDni: number | null;
            birthday: string | null;
            phone: string | null;
            profile_picture: string | null;
            isOlder: boolean;
            role_id: string;
            credential_id: string | null;
        };
    } & {
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
        company_logo: string | null;
        isActive: boolean;
    }>;
    findCompaniesByUserId(userId: string): Promise<{
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
        company_logo: string | null;
        isActive: boolean;
    }[]>;
    getAccountPaypalByUserIdRepository(companyId: string): Promise<{
        error: string;
        statusCode: number;
        account_paypal?: undefined;
    } | {
        account_paypal: string;
        statusCode: number;
        error?: undefined;
    }>;
    create(companyData: CreateCompanyDto): Promise<{
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
        company_logo: string | null;
        isActive: boolean;
    }>;
    update(companyId: string, companyData: UpdateCompanyDto): Promise<{
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
        company_logo: string | null;
        isActive: boolean;
    }>;
    softDelete(companyId: string): Promise<{
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
        company_logo: string | null;
        isActive: boolean;
    }>;
    findByAcoountPaypalById(company_supplier_id: string): Promise<string>;
}
