import { CreateCompanyDto } from "./createCompany.dto";
declare const UpdateCompanyDto_base: import("@nestjs/common").Type<Partial<CreateCompanyDto>>;
export declare class UpdateCompanyDto extends UpdateCompanyDto_base {
    website?: string;
}
export {};
