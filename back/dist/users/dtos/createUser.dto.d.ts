export declare class CreateUserDto {
    user_name: string;
    user_lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    isOlder: boolean;
    nDni: number;
    birthday: Date;
    phone?: string;
    country?: string;
    profile_picture: any;
    role_id: string;
}
