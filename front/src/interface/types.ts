export interface ISignUp {
    name: string;
    lastName: string;
    password: string;
    email: string;
    country: string;
    phone: number;
}
export interface ISignUpErrors {
    name?: string;
    lastName?: string;
    password?: string;
    email?: string;
    country?: string;
    phone?: number;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginError {
    email?: string;
    password?: string;
}

export interface ISignUpComponentProps {
    onClose: () => void;
}