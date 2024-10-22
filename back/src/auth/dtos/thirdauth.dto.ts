import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class thirdAuthDto {
  @ApiProperty({ description: "Email del usuario", example: "user@example.com" })
  @IsNotEmpty({ message: 'El campo email no debe estar vacío' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @ApiProperty({ description: "Nombre del usuario", example: "Juan Pérez" })
  @IsNotEmpty({ message: 'El campo name no debe estar vacío' })
  @IsString({ message: 'El campo name debe ser un string' })
  name: string;

  @ApiProperty({ description: "Role asociado al usuario", example: "buyer", required: false })
  @IsOptional()
  @IsString({ message: 'El campo role_name debe ser un string' })
  role_name?: string;
}
