export declare class CreateUserDto {
    user_name: string;
    user_lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    nDni: number;
    birthday: Date;
    phone?: string;
    country?: string;
    role_id: string;
}
