import { CreateShippingAddressDto } from "./createShippingAddress.dto";
declare const UpdateShippingAddressDto_base: import("@nestjs/common").Type<Partial<CreateShippingAddressDto>>;
export declare class UpdateShippingAddressDto extends UpdateShippingAddressDto_base {
    contact_name: string;
}
export {};
