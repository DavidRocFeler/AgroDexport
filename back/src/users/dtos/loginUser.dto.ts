import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./createUser.dto";
import { ApiProperty, PickType } from "@nestjs/swagger";

export class LoginUserDto extends PickType(CreateUserDto, ['email']) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Password del usuario, no puede estar vacío",
        example: "Password123!",
    })
    password: string; 
}