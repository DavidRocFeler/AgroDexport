import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class thirdAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ description: "Role name associated with the user", example: "buyer" })
    @IsNotEmpty()
    role_name: string;
}