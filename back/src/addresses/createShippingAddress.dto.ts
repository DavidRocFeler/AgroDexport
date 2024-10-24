import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateShippingAddressDto {

    @ApiProperty({ description: 'Company ID who owns the address', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    @IsNotEmpty()
    company_id: string; 

    @ApiProperty({ description: 'User first name', example: "Juan", maxLength: 50 })
    @IsNotEmpty()
    @Matches(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The first name should only contain letters and no spaces' })
    @Length(1, 50)
    contact_name: string;
  
    @ApiProperty({ description: 'User last name',  example: "Perez", maxLength: 50 })
    @IsNotEmpty()
    @Matches(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The last name should only contain letters and no spaces' })
    @Length(1, 50)
    contact_lastname: string;

    @ApiProperty({ description: 'User email', example: "luis@example.com", maxLength: 255 })
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 255)
    contact_email: string;

    @IsOptional()
    @IsString()
    contact_phone?: string;

    @IsOptional()
    @IsString()
    delivery_hours?: string;

    @ApiProperty({ description: 'Address of the company', example: "Camino del Sol 123", maxLength: 255 })
    @IsNotEmpty({ message: 'The address cannot be empty.' })
    @IsString({ message: 'The address must be a string.' })
    @Length(1, 255, { message: 'The address must be between 1 and 255 characters.' })
    @Matches(/^[a-zA-Z0-9\s\-,.#/]+$/, { message: 'The address can only contain letters, numbers, spaces, commas, periods, hyphens, and slashes.' })
    @Matches(/\S/, { message: 'The address cannot consist only of spaces.' })
    address: string;

    @ApiProperty({ description: 'Postal code of the company', example: "111112", maxLength: 20 })
    @IsNotEmpty({ message: 'The postal code cannot be empty.' })
    @IsString({ message: 'The postal code must be a string.' })
    @MinLength(1, { message: 'The postal code must have at least 1 character.' })
    @MaxLength(20, { message: 'The postal code cannot exceed 20 characters.' })
    @Matches(/^[a-zA-Z0-9\s\-]+$/, { message: 'The postal code can only contain letters, numbers, spaces, and hyphens.' })
    @Matches(/\S/, { message: 'The postal code cannot consist only of spaces.' })
    postal_code: string;

    @ApiProperty({ description: 'City where the company is located', example: "Zipaquira" })
    @IsNotEmpty({ message: 'The city cannot be empty.' })
    @IsString({ message: 'The city must be a string.' })
    @Length(1, 100, { message: 'The city name must be between 1 and 100 characters.' })
    @Matches(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The city can only contain letters, spaces, hyphens, apostrophes, and periods.' })
    @Matches(/\S/, { message: 'The city cannot consist only of spaces.' })
    city: string;

    @ApiProperty({ description: 'State where the company is located', example: "Cundinamarca" })
    @IsNotEmpty({ message: 'The state cannot be empty.' })
    @IsString({ message: 'The state must be a string.' })
    @Length(1, 100, { message: 'The state name must be between 1 and 100 characters.' })
    @Matches(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The state can only contain letters, spaces, hyphens, apostrophes, and periods.' })
    @Matches(/\S/, { message: 'The state cannot consist only of spaces.' })
    state: string;

    @ApiProperty({ description: 'Country where the company is located', example: "Colombia" })
    @IsNotEmpty({ message: 'The country cannot be empty.' }) 
    @IsString({ message: 'The country must be a string.' })
    @Length(1, 100, { message: 'The country name must be between 1 and 100 characters.' })
    @Matches(/^[a-zA-Z\s\-\'\.]+$/, { message: 'The country can only contain letters, spaces, hyphens, apostrophes, and periods.' })
    @Matches(/\S/, { message: 'The country cannot consist only of spaces.' })
    country: string;

}



