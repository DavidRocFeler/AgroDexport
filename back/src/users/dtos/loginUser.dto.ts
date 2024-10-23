import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./createUser.dto";
import { ApiProperty, PickType } from "@nestjs/swagger";

export class LoginUserDto extends PickType(CreateUserDto, ['email']) {
    @ApiProperty({
        description: "Password del usuario, no puede estar vacío",
        example: "Password123!",
    })
    @IsNotEmpty({ message: 'La contraseña no debe estar vacía' })
    @IsString({ message: 'La contraseña debe ser un string' })
    password: string; 
}