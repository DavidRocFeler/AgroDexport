import { IsString, IsOptional, IsInt, IsNumber, IsDate, Min, MaxLength, IsUUID, IsNotEmpty, IsUrl, IsDateString, IsISO8601, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyProductDto {
 
    @ApiProperty({
        description: 'ID of the associated farmer, if applicable',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsString()
    @IsOptional()
    @IsUUID('all', { message: 'farmer_id must be a valid UUID.' }) 
    farmer_id?: string | null;

    @ApiProperty({
        description: 'ID of the company',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsString()
    @IsUUID('all', { message: 'company_id must be a valid UUID.' })
    company_id: string;

    @ApiProperty({
        description: 'ID of the product category',
        example: 'a0eebef6-21b4-4f60-a2a7-4b8b9c9a09f3',
    })
    @IsString()
    @IsUUID('all', { message: 'category_id must be a valid UUID.' }) 
    category_id: string;

    @ApiProperty({
        description: 'Associated order details, if applicable',
        example: '3d6f4c77-fb73-49f2-b5bc-49b6bc6b7725',
    })
    @IsString()
    @IsOptional()
    @IsUUID('all', { message: 'order_details_id must be a valid UUID.' }) 
    order_details_id?: string | null;

    @ApiProperty({
        description: 'ID of the applied discount, if applicable',
        example: 'c9ebef93-aba7-4c7f-b2a3-13ccba2d95ed',
    })
    @IsString()
    @IsOptional()
    @IsUUID('all', { message: 'discount_id must be a valid UUID.' }) 
    discount_id?: string | null;

    @ApiProperty({
        description: 'Name of the company product',
        example: 'Organic Tomato',
    })
    @IsString()
    @MaxLength(255, { message: 'company_product_name must not exceed 255 characters.' }) 
    company_product_name: string;

    @ApiProperty({
        description: 'Description of the company product',
        example: 'Fresh and organic tomatoes from the region.',
    })
    @IsString()
    @IsOptional()
    @MaxLength(500, { message: 'company_product_description must not exceed 500 characters.' }) 
    company_product_description?: string;

    @ApiProperty({
        description: 'Available stock of the product',
        example: 100,
    })
    @IsInt({ message: 'stock must be an integer.' }) 
    @Min(0, { message: 'stock cannot be less than 0.' }) 
    stock: number;

    @ApiProperty({
        description: 'Minimum order quantity',
        example: 5,
    })
    @IsInt({ message: 'minimum_order must be an integer.' }) 
    @Min(5, { message: 'minimum_order must be at least 5.' }) 
    minimum_order: number;

    @ApiProperty({
        description: 'Origin of the product',
        example: 'Colombia',
    })
    @IsString({ message: 'origin must be a string.' }) 
    @IsNotEmpty({ message: 'origin cannot be empty.' }) 
    origin: string;

    @ApiProperty({
        description: 'Price per kilogram of the company',
        example: 2.5,
    })
    @IsNumber({}, { message: 'company_price_x_kg must be a number.' }) 
    @IsNotEmpty({ message: 'company_price_x_kg cannot be empty.' }) 
    @Min(0, { message: 'company_price_x_kg must be at least 0.' }) 
    company_price_x_kg: number;

    @ApiProperty({
        description: 'Total price of the product',
        example: 25.0,
    })
    @IsNumber({}, { message: 'total_price must be a number.' }) 
    @IsNotEmpty({ message: 'total_price cannot be empty.' }) 
    @Min(0, { message: 'total_price must be at least 0.' }) 
    total_price: number;

    @ApiProperty({
        description: 'Harvest date of the product',
        example: '2024-10-19', // Asegúrate de que el ejemplo incluya 'Z' si es UTC
    })
    @IsString({ message: 'harvest_date must be a string.' })
    @IsNotEmpty({ message: 'harvest_date cannot be empty.' })
    harvest_date: string;

    @ApiProperty({
        description: 'URL of the product image',
        example: 'https://example.com/tomato.jpg',
    })
    @IsString({ message: 'company_product_img must be a string.' }) 
    @IsNotEmpty({ message: 'company_product_img cannot be empty.' }) 
    @IsUrl({}, { message: 'company_product_img must be a valid URL.' }) 
    company_product_img: string;

    @ApiProperty({
        description: 'Calories per serving of the product, if applicable',
        example: 20.0,
    })
    @IsNumber({}, { message: 'calories must be a number.' }) 
    @IsOptional() 
    @Min(0, { message: 'calories must be at least 0.' }) 
    calories?: number;

    @ApiProperty({
        description: 'Fat content per serving of the product, if applicable',
        example: 0.5,
    })
    @IsNumber({}, { message: 'fat must be a number.' }) 
    @IsOptional() 
    @Min(0, { message: 'fat must be at least 0.' }) 
    fat?: number;

    @ApiProperty({
        description: 'Protein content per serving of the product, if applicable',
        example: 1.0,
    })
    @IsNumber({}, { message: 'protein must be a number.' }) 
    @IsOptional() 
    @Min(0, { message: 'protein must be at least 0.' }) 
    protein?: number;

    @ApiProperty({
        description: 'Carbohydrate content per serving of the product, if applicable',
        example: 4.0,
    })
    @IsNumber({}, { message: 'carbs must be a number.' }) 
    @IsOptional() 
    @Min(0, { message: 'carbs must be at least 0.' }) 
    carbs?: number;

    @ApiProperty({ description: 'Indicates whether the product is active or inactive', default: true })
    @IsOptional() 
    @IsBoolean({ message: 'The isActive field must be a boolean value.' }) 
    isActive: boolean; 
}
