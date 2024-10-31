import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsUUID, Length, IsBoolean, Matches, IsPositive, Min, Max, NotEquals, MinLength, MaxLength,} from 'class-validator';

export class CreateCompanyDto {

     
  @ApiProperty({ description: 'User ID who owns the company', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string; 

  @ApiProperty({ description: 'Name of the company', example: "AgroVerde", maxLength: 50 })
  @IsOptional() 
  @IsString({ message: 'The company name must be a string.' })
  @Length(1, 50, { message: 'The company name must be between 1 and 50 characters.' })
  @Matches(/^[a-zA-Z0-9\s\-]+$/, { message: 'The company name can only contain letters, numbers, spaces, and hyphens.' })
  @Matches(/\S/, { message: 'The company name cannot consist only of spaces.' })
  company_name: string;

  @ApiProperty({ description: 'Tax identification number of the company', example: 123456789 })
  @IsInt({ message: 'The tax identification number must be an integer.' })
  @IsOptional() 
  @IsPositive({ message: 'The tax identification number must be a positive number.' })
  @Min(100000000, { message: 'The tax identification number must be at least 9 digits.' })
  @Max(999999999, { message: 'The tax identification number cannot exceed 9 digits.' })
  @NotEquals(0, { message: 'The tax identification number cannot be all zeros.' })
  tax_identification_number: number;

  @ApiProperty({ description: 'Address of the company', example: "Camino del Sol 123", maxLength: 255 })
  @IsOptional() 
  @IsString({ message: 'The address must be a string.' })
  @Length(1, 255, { message: 'The address must be between 1 and 255 characters.' })
  @Matches(/^[a-zA-Z0-9\s\-,.#/]+$/, { message: 'The address can only contain letters, numbers, spaces, commas, periods, hyphens, and slashes.' })
  @Matches(/\S/, { message: 'The address cannot consist only of spaces.' })
  address: string;

  @ApiProperty({ description: 'Postal code of the company', example: "111112", maxLength: 20 })
  @IsOptional() 
  @IsString({ message: 'The postal code must be a string.' })
  @MinLength(1, { message: 'The postal code must have at least 1 character.' })
  @MaxLength(20, { message: 'The postal code cannot exceed 20 characters.' })
  @Matches(/^[a-zA-Z0-9\s\-]+$/, { message: 'The postal code can only contain letters, numbers, spaces, and hyphens.' })
  @Matches(/\S/, { message: 'The postal code cannot consist only of spaces.' })
  postal_code: string;
 
  @ApiProperty({ description: 'City where the company is located', example: "Zipaquira" })
  @IsOptional() 
  @IsString({ message: 'The city must be a string.' })
  @Length(1, 100, { message: 'The city name must be between 1 and 100 characters.' })
  @Matches(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The city can only contain letters, spaces, hyphens, apostrophes, and periods.' })
  @Matches(/\S/, { message: 'The city cannot consist only of spaces.' })
  city: string;

  @ApiProperty({ description: 'State where the company is located', example: "Cundinamarca" })
  @IsOptional() 
  @IsString({ message: 'The state must be a string.' })
  @Length(1, 100, { message: 'The state name must be between 1 and 100 characters.' })
  @Matches(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The state can only contain letters, spaces, hyphens, apostrophes, and periods.' })
  @Matches(/\S/, { message: 'The state cannot consist only of spaces.' })
  state: string;

  @ApiProperty({ description: 'Country where the company is located', example: "Colombia" })
  @IsOptional() 
  @IsString({ message: 'The country must be a string.' })
  @Length(1, 100, { message: 'The country name must be between 1 and 100 characters.' })
  @Matches(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The country can only contain letters, spaces, hyphens, apostrophes, and periods.' })
  @Matches(/\S/, { message: 'The country cannot consist only of spaces.' })
  country: string;

  @ApiProperty({ description: 'Industry in which the company operates', example: "Cafetera" })
  @IsOptional() 
  @IsString({ message: 'The industry must be a string.' })
  @Length(1, 100, { message: 'The industry name must be between 1 and 100 characters.' }) 
  @Matches(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The industry can only contain letters, spaces, hyphens, apostrophes, and periods.' }) 
  @Matches(/\S/, { message: 'The industry cannot consist only of spaces.' }) 
  industry: string;

  @ApiProperty({ description: 'Website of the company', example: "www.agroverde.com.co" })
  @IsOptional() 
  @IsString({ message: 'The website must be a string.' })
  @Matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/, { message: 'The website must be a valid URL format.' }) 
  website?: string;

  @ApiProperty({ description: 'PayPal account associated with the company', example: "paypal@agroverde.com.co" })
  @IsOptional() 
  @IsString({ message: 'The PayPal account must be a string.' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'The PayPal account must be a valid email format.' }) 
  @Length(1, 255, { message: 'The PayPal account must be between 1 and 255 characters.' }) 
  account_paypal: string;


  @ApiProperty({ description: 'Description of the company', example: "Distruibuidora de Cafe", required: false })
  @IsOptional() 
  @IsString({ message: 'The company description must be a string.' })
  @Length(1, 1000, { message: 'The company description must be between 1 and 1000 characters.' }) 
  @Matches(/\S/, { message: 'The company description cannot consist only of spaces.' }) 
  company_description?: string;


  @ApiProperty({ description: 'Logo URL of the company', example: "https://www.agroverde.com.co/logo.jpg" })
  @IsString({ message: 'The company logo must be a string.' })
  @IsOptional() 
  @Matches(/^https?:\/\/[^\s]+$/, { message: 'The company logo must be a valid URL.' }) 
  @Length(1, 255, { message: 'The company logo must be between 1 and 255 characters.' }) 
  company_logo: string = "https://i.mkt.lu/assets/logo_empresa_5.png"; 
  
  @ApiProperty({ description: 'Indicates whether the company is active or inactive', default: true })
  @IsOptional() 
  @IsBoolean({ message: 'The isActive field must be a boolean value.' }) 
  isActive: boolean; 

}
