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
            user_name: string;
            user_lastname: string;
            nDni: number | null;
            birthday: string | null;
            phone: string | null;
            country: string | null;
            profile_picture: string | null;
            isOlder: boolean;
            role_id: string;
            credential_id: string | null;
        };
    } & {
        user_id: string;
        country: string;
        company_id: string;
        isActive: boolean;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        company_name: string;
        tax_identification_number: number;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string | null;
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
            user_name: string;
            user_lastname: string;
            nDni: number | null;
            birthday: string | null;
            phone: string | null;
            country: string | null;
            profile_picture: string | null;
            isOlder: boolean;
            role_id: string;
            credential_id: string | null;
        };
    } & {
        user_id: string;
        country: string;
        company_id: string;
        isActive: boolean;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        company_name: string;
        tax_identification_number: number;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string | null;
    }>;
    findCompaniesByUserId(userId: string): Promise<{
        user_id: string;
        country: string;
        company_id: string;
        isActive: boolean;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        company_name: string;
        tax_identification_number: number;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string | null;
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
        user_id: string;
        country: string;
        company_id: string;
        isActive: boolean;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        company_name: string;
        tax_identification_number: number;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string | null;
    }>;
    update(companyId: string, companyData: UpdateCompanyDto): Promise<{
        user_id: string;
        country: string;
        company_id: string;
        isActive: boolean;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        company_name: string;
        tax_identification_number: number;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string | null;
    }>;
    softDelete(companyId: string): Promise<{
        user_id: string;
        country: string;
        company_id: string;
        isActive: boolean;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        company_name: string;
        tax_identification_number: number;
        industry: string;
        website: string | null;
        account_paypal: string | null;
        company_description: string | null;
        company_logo: string | null;
    }>;
    findByAcoountPaypalById(company_supplier_id: string): Promise<string>;
}
