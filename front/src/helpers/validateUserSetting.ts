import { ISettingsUserProps } from "@/interface/types";

  export const validateRegister = ({
    user_name,
    birthday,
    nDni,
  }: ISettingsUserProps): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    // Validación de user_name
    if (!user_name) {
      errors.user_name = "The name field is required.";
    } else {
      if (user_name.length < 3) {
        errors.user_name = "The name must have at least 3 characters.";
      }
      if (user_name.length > 20) {
        errors.user_name = "The name must be less than 20 characters.";
      }
    }
  
    // Validación de birthday
    if (!birthday) {
      errors.birthday = "The birthdate field is required.";
    } else {
      const dateRegex = /\d{4}-\d{2}-\d{2}/;
      if (!dateRegex.test(birthday)) {
        errors.birthday = "The birthdate must be in the format yyyy-mm-dd.";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const birthdayDate = new Date(birthday);
        const ageDiff = new Date(today.getTime() - birthdayDate.getTime());
        const age = ageDiff.getUTCFullYear() - 1970;
        if (age < 16) {
          errors.birthday = "The person must be at least 16 years old.";
        }
      }
    }
  
    // Validación de nDni
    if (nDni === undefined || nDni === null) {
      errors.nDni = "The DNI field is required.";
    } else if (typeof nDni !== "number") {
      errors.nDni = "The DNI must be a number.";
    } else if (nDni < 0) {
      errors.nDni = "The DNI must be a positive number.";
    }
  
    return errors;
  };
  