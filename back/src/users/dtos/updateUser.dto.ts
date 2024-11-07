import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./createUser.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
      description: 'Número de documento de identidad (DNI) del usuario',
      example: 12345678,
    })
    @IsOptional()
    @IsInt()
    nDni?: bigint; 
  
    @ApiProperty({
      description: 'Fecha de nacimiento del usuario',
      example: '05-10-1990',
    })
    @IsOptional()
    @IsString()
    birthday?: string;
  
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

    @ApiProperty({ description: 'Indicates whether the User is active or inactive'})
    @IsOptional() 
    @IsBoolean({ message: 'The isActive field must be a boolean value.' }) 
    isActive?: boolean; 
}  