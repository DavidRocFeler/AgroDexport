import { CreateUserDto } from "./createUser.dto";
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    nDni?: number;
    birthday?: string;
    phone?: string;
    country?: string;
    profile_picture?: string;
}
export {};
