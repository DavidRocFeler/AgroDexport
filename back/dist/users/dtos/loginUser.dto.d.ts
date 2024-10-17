import { CreateUserDto } from "./createUser.dto";
declare const LoginUserDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "email">>;
export declare class LoginUserDto extends LoginUserDto_base {
    password: string;
}
export {};
