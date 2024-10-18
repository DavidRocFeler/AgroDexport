import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCompanyDto } from "./createCompany.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {

    @ApiProperty({ description: 'Website of the company', required: false })
    @IsOptional()
    @IsString()
    website?: string; 

}