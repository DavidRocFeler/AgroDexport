import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Name of the permission',
    example: 'view_products',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  permission_name: string;

  @ApiProperty({
    description: 'Description of the permission',
    example: 'Permission to view products',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  permission_description: string;
}
