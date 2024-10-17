import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, Validate,  } from "class-validator";
import { MatchPassword } from "src/decorators/match.decorator";

export class SingUpDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty( {
        description: "Please use a valid email",
        example: "example@email.com"
    })
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, 
        { message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character [!@#$%^&*]. It must be between 8 and 15 characters long." }
    )
    password: string;

    @Validate(MatchPassword, ["password"])
    confirmPassword: string
}