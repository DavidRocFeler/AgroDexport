import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';


export class CreateCategoryDto {
    
    @ApiProperty({ description: 'Category name', maxLength: 25 })
    @IsNotEmpty()
    @Length(1, 25)
    name_category: string;
}