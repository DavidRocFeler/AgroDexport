// src/roles/dto/create-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'buyer',
  })
  @IsNotEmpty()
  @IsString()
  role_name: string;

  @ApiProperty({
    description: 'A brief description of the role',
    example: 'Role for buyers in the system',
  })
  @IsNotEmpty()
  @IsString()
  role_description: string;

}
