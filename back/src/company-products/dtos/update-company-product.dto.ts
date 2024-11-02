
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCompanyProductDto } from './create-company-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCompanyProductDto  extends PartialType(CreateCompanyProductDto) {
    @ApiProperty({ description: 'Indicates whether the product is active or inactive'})
    @IsOptional() 
    @IsBoolean({ message: 'The isActive field must be a boolean value.' }) 
    isActive?: boolean; 

}
 
   