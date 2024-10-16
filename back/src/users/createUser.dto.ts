// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsInt, Length, Matches, Validate, IsUUID } from 'class-validator';
import { MatchPassword } from '../decorators/match.decorator';

export class CreateUserDto {
    
    @ApiProperty({ description: 'User first name', maxLength: 50 })
    @IsNotEmpty()
    @Matches(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The first name should only contain letters and no spaces' })
    @Length(1, 50)
    user_name: string;
  
    @ApiProperty({ description: 'User last name', maxLength: 50 })
    @IsNotEmpty()
    @Matches(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The last name should only contain letters and no spaces' })
    @Length(1, 50)
    user_lastname: string;

    @ApiProperty({ description: 'User email', maxLength: 255 })
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 255)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/, {
        message: 'The password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*',
    })
    @ApiProperty({
        description: "The user's password. Must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*",
        example: "Test123!",
    })
    password: string;

    // Validation directly inside the DTO
    @IsNotEmpty()
    @Validate(MatchPassword, ['password']) // <- references the DTO password
    @ApiProperty({
        description: "Must match the password field",
        example: "Test123!",
    })
    confirmPassword: string;

    @ApiProperty({ description: 'User DNI number', example: 12345678 })
    @IsNotEmpty()
    @IsInt()
    nDni: number;

    @ApiProperty({ description: "User's date of birth", example: '1990-01-01' })
    @IsNotEmpty()
    birthday: Date;

    @ApiProperty({ description: 'User phone number', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'User country', required: false })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiProperty({ description: "Role ID associated with the user", example: "role-uuid-id" })
    @IsNotEmpty()
    @IsUUID() 
    role_id: string;
}
