import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsUUID, Length, IsBoolean,} from 'class-validator';

export class CreateCompanyDto {

     
  @ApiProperty({ description: 'User ID who owns the company', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string; 

  @ApiProperty({ description: 'Name of the company', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  company_name: string; 

  @ApiProperty({ description: 'Tax identification number of the company', example: 123456789 })
  @IsInt()
  @IsNotEmpty()
  tax_identification_number: number; 

  @ApiProperty({ description: 'Address of the company', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  address: string; 

  @ApiProperty({ description: 'Postal code of the company', maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  postal_code: string; 

  @ApiProperty({ description: 'City where the company is located', required: false })
  @IsNotEmpty()
  @IsString()
  city: string; 

  @ApiProperty({ description: 'State where the company is located', required: false })
  @IsNotEmpty()
  @IsString()
  state: string; 

  @ApiProperty({ description: 'Country where the company is located', required: false })
  @IsNotEmpty()
  @IsString()
  country: string; 

  @ApiProperty({ description: 'Industry in which the company operates', required: false })
  @IsNotEmpty()
  @IsString()
  industry: string; 

  @ApiProperty({ description: 'Website of the company', required: false })
  @IsOptional()
  @IsString()
  website?: string; 

  @ApiProperty({ description: 'PayPal account associated with the company', required: false })
  @IsNotEmpty()
  @IsString()
  account_paypal?: string; 

  @ApiProperty({ description: 'Description of the company', required: false })
  @IsOptional()
  @IsString()
  company_description?: string; 

  @ApiProperty({ description: 'Logo URL of the company', required: true })
  @IsNotEmpty()
  @IsString()
  company_logo: string; 

  @ApiProperty({ description: 'Indicates whether the company is active or inactive', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
