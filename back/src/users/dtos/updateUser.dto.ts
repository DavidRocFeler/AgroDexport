import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./createUser.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
      description: 'Número de documento de identidad (DNI) del usuario',
      example: 12345678,
    })
    @IsOptional()
    @IsInt()
    nDni?: number; 
  
    @ApiProperty({
      description: 'Fecha de nacimiento del usuario',
      example: '1990-01-01T00:00:00.000Z',
    })
    @IsOptional()
    birthday?: Date;
  
    @ApiProperty({
      description: 'Número de teléfono del usuario',
      example: '+1234567890',
    })
    @IsOptional()
    @IsString()
    phone?: string;
  
    @ApiProperty({
      description: 'País del usuario',
      example: 'USA',
    })
    @IsOptional()
    @IsString()
    country?: string;
  
    @ApiProperty({
      description: 'Imagen de perfil del usuario',
      example: 'https://example.com/profile.jpg',
    })
    @IsOptional()
    @IsString()
    profile_picture?: string;
}  