import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, IsUUID, IsOptional, Validate } from "class-validator";
import { ValidateIfFiveProducts } from "src/helpers/validateIfFiveProducts";

export class CreateOrderProductsDto {
    
    @ApiProperty({
        description: 'ID of the company buyer',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsString()
    @IsNotEmpty({ message: 'company_buyer_id is required.' })
    @IsUUID('all', { message: 'company_buyer_id must be a valid UUID.' })
    company_buyer_id: string;

    @ApiProperty({
        description: 'ID of the company supplier',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsString()
    @IsNotEmpty({ message: 'company_supplier_id required.' })
    @IsUUID('all', { message: 'company_supplier_id must be a valid UUID.' })
    company_supplier_id: string;

    @ApiProperty({
        description: 'ID of the product one (mandatory)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsString()
    @IsNotEmpty({ message: 'product_one_id is required.' })
    @IsUUID('all', { message: 'product_one_id must be a valid UUID.' })
    product_one_id: string;

    @ApiProperty({
        description: 'Quantity of product one',
        example: 10,
    })
    @IsNotEmpty({ message: 'quantity_product_one is required.' })
    @IsInt({ message: 'quantity_product_one must be an integer.' })
    @IsPositive({ message: 'Quantity of product_one must be a positive integer.' })
    quantity_product_one: number;

    // Opcionales
    @ApiProperty({
        description: 'ID of the product two (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    })
    @IsOptional()
    @IsString()
    @IsUUID('all', { message: 'product_two_id must be a valid UUID.' })
    product_two_id?: string;

    @ApiProperty({
        description: 'Quantity of product two',
        example: 5,
        required: false
    })
    @IsOptional()
    @IsInt({ message: 'quantity_product_two must be an integer.' })
    @IsPositive({ message: 'Quantity of product_two must be a positive integer.' })
    quantity_product_two?: number;

    @ApiProperty({
        description: 'ID of the product three (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    })
    @IsOptional()
    @IsString()
    @IsUUID('all', { message: 'product_three_id must be a valid UUID.' })
    product_three_id?: string;

    @ApiProperty({
        description: 'Quantity of product three',
        example: 2,
        required: false
    })
    @IsOptional()
    @IsInt({ message: 'quantity_product_three must be an integer.' })
    @IsPositive({ message: 'Quantity of product_three must be a positive integer.' })
    quantity_product_three?: number;

    @ApiProperty({
        description: 'ID of the product four (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    })
    @IsOptional()
    @IsString()
    @IsUUID('all', { message: 'product_four_id must be a valid UUID.' })
    product_four_id?: string;

    @ApiProperty({
        description: 'Quantity of product four',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsInt({ message: 'quantity_product_four must be an integer.' })
    @IsPositive({ message: 'Quantity of product_four must be a positive integer.' })
    quantity_product_four?: number;

    @ApiProperty({
        description: 'ID of the product five (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    })
    @IsOptional()
    @IsString()
    @IsUUID('all', { message: 'product_five_id must be a valid UUID.' })
    product_five_id?: string;

    @ApiProperty({
        description: 'Quantity of product five',
        example: 3,
        required: false
    })
    @IsOptional()
    @IsInt({ message: 'quantity_product_five must be an integer.' })
    @IsPositive({ message: 'Quantity of product_five must be a positive integer.' })
    quantity_product_five?: number;

    @Validate(ValidateIfFiveProducts, {
        message: 'You cannot include more than 5 products.'
    })
    productsCount: number;
}
