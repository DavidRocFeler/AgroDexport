import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateShippingAddressDto } from "./createShippingAddress.dto";
import { IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateShippingAddressDto extends PartialType(CreateShippingAddressDto) {

    @ApiProperty({ description: 'User first name', example: "Reinaldo", maxLength: 50 })
    @Matches(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The first name should only contain letters and no spaces' })
    @IsOptional()
    @Length(1, 50)
    contact_name: string;
}