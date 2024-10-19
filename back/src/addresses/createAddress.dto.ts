import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAddressDto {

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

// // Definición del modelo ShippingAddress
// model ShippingAddress {
//     shipping_address_id       String    @id @default(uuid()) 
//     company_id                String    
//     contact_name              String
//     contact_lastname          String
//     contact_phone             String
//     contact_email             String
//     delivery_hours            String

