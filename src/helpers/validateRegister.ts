import { ISignUp, ISignUpErrors} from "@/interface/types";

export const validateRegister = (values: ISignUp) => {
    const errors: ISignUpErrors = {};

    // Validación de name
    if (!values.name) {
        errors.name = "The name field is required.";
    } else {
        if (values.name.length < 3) {
            errors.name = "The name must have at least 3 characters.";
        }
        if (values.name.length > 20) {
            errors.name = "The name must be less than 20 characters.";
        }
    }

    // Validación de email
    if (!values.email) {
        errors.email = "The email field is required.";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
            errors.email = "The email must be a valid email address.";
        }
    }


    // Validación de password
    if (!values.password) {
        errors.password = "The password field is required.";
    } else {
        if (values.password.length < 4) {
            errors.password = "The password must have at least 4 characters.";
        }
        if (values.password.length > 20) {
            errors.password = "The password must be less than 20 characters.";
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&€£]).*$/;
        if (!passwordRegex.test(values.password)) {
            errors.password = "The password must contain at least one letter, one number, and one special character";
        }
    }

    return errors;
};