import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateShippingAddressDto } from './updateShippingAddress.dto';
import { CreateShippingAddressDto } from './createShippingAddress.dto';
import { ShippingAddress } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AddressesRepository {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationsService);
    getAll(): Promise<ShippingAddress[]>;
    getWithFilters(filters: any[]): Promise<ShippingAddress[]>;
    findById(addressId: string): Promise<{
        userId: string;
        company: {
            user: {
                user_id: string;
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
        };
        country: string;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        isActive: boolean;
        company_id: string;
        contact_name: string;
        contact_lastname: string;
        contact_email: string;
        contact_phone: string | null;
        delivery_hours: string | null;
        shipping_address_id: string;
    }>;
    findByAddress(address: string): Promise<{
        company: {
            company_name: string;
        };
    } & {
        country: string;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        isActive: boolean;
        company_id: string;
        contact_name: string;
        contact_lastname: string;
        contact_email: string;
        contact_phone: string | null;
        delivery_hours: string | null;
        shipping_address_id: string;
    }>;
    updateAddress(addressId: string, addressData: UpdateShippingAddressDto): Promise<{
        country: string;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        isActive: boolean;
        company_id: string;
        contact_name: string;
        contact_lastname: string;
        contact_email: string;
        contact_phone: string | null;
        delivery_hours: string | null;
        shipping_address_id: string;
    }>;
    create(shippingAddressData: CreateShippingAddressDto): Promise<ShippingAddress>;
    softDelete(addressId: string): Promise<{
        country: string;
        address: string;
        postal_code: string;
        city: string;
        state: string;
        isActive: boolean;
        company_id: string;
        contact_name: string;
        contact_lastname: string;
        contact_email: string;
        contact_phone: string | null;
        delivery_hours: string | null;
        shipping_address_id: string;
    }>;
    findAdressIdByCompanyId(company_buyer_id: string): Promise<string>;
}
