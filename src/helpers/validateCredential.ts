import { ILogin, ILoginError } from "@/interface/types";

export const validateCredentials = (values: ILogin) => {
    const errors: ILoginError = {};

    // Validación de username
    if (!values.email) {
        errors.email = "The username field is required.";
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