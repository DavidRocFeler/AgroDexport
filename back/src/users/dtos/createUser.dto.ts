import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsInt, Length, Matches, Validate, IsUUID, IsBoolean, IsUrl } from 'class-validator';
import { MatchPassword } from 'src/decorators/match.decorator';

export class CreateUserDto {
    
    @ApiProperty({ description: 'User first name', example: "Juan", maxLength: 50 })
    @IsNotEmpty()
    @Matches(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The first name should only contain letters and no spaces' })
    @Length(1, 50)
    user_name: string;
  
    @ApiProperty({ description: 'User last name',  example: "Perez", maxLength: 50 })
    @IsNotEmpty()
    @Matches(/^[a-zA-ZÀ-ÿÑñ]+$/, { message: 'The last name should only contain letters and no spaces' })
    @Length(1, 50)
    user_lastname: string;

    @ApiProperty({ description: 'User email', example: "juanperez@example.com", maxLength: 255 })
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

    @ApiProperty({ description: 'Indicates whether the user is of legal age (true for older, false for younger)', example: true })
    @IsNotEmpty()
    @IsBoolean()
    isOlder: boolean

    @ApiProperty({ description: "Role ID associated with the user", example: "e5d2b729-bb43-4b95-97af-a136bcace016" })
    @IsNotEmpty()
    @IsUUID() 
    role_id: string;
  
}