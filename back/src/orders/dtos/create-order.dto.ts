import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateOrderDto {

    @ApiProperty({
        description: 'ID of the selling company',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID('all', { message: 'id_company_sell must be a valid UUID.' })
    id_company_sell: string;

    @ApiProperty({
        description: 'ID of the payment (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    })
    @IsOptional()
    @IsUUID('all', { message: 'id_payments must be a valid UUID.' })
    id_payments?: string;

    @ApiProperty({
        description: 'Shipping address ID (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    })
    @IsOptional()
    @IsUUID('all', { message: 'shipping_address_id must be a valid UUID.' })
    shipping_address_id?: string;

    @ApiProperty({
        description: 'Order details ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID('all', { message: 'order_details_id must be a valid UUID.' })
    order_details_id: string;

    @ApiProperty({
        description: 'Supply chain ID (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    })
    @IsOptional()
    @IsUUID('all', { message: 'supply_chain_id must be a valid UUID.' })
    supply_chain_id?: string;

    @ApiProperty({
        description: 'Date the order was placed',
        example: '2023-10-12',
    })
    order_date: string;

    @ApiProperty({
        description: 'Payment ID (optional)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false,
    })
    @IsOptional()
    @IsUUID('all', { message: 'payment_id must be a valid UUID.' })
    payment_id?: string;
}
