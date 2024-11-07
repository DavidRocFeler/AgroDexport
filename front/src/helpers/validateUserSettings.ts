import { ISettingsUserProps } from '@/interface/types';

export const validateUserSettings = (values: ISettingsUserProps): Partial<Record<keyof ISettingsUserProps, string>> => {
  const newErrors: Partial<Record<keyof ISettingsUserProps, string>> = {};

  // Expresiones regulares para validaciones
  const regexPhone = /^\+\d{1,15}$/;  // Validación del teléfono
  const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;  
  const regexLastName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;  
  const regexDni = /^[0-9]{1,15}$/;  // DNI solo numeros (hasta 15 caracteres alfanuméricos)
  const regexBirthday = /^\d{4}-\d{2}-\d{2}$/;

  // Validación de nombre de usuario
  if (!values.user_name || !regexName.test(values.user_name)) {
    newErrors.user_name = 'The name is mandatory and must contain between 3 and 50 letters. It cannot include numbers.';
  }

  // Validación de apellido
  if (!values.user_lastname || !regexLastName.test(values.user_lastname)) {
    newErrors.user_lastname = 'The surname is mandatory and must contain between 3 and 50 letters. It cannot include numbers.';
  }

  // Validación de DNI
  if (values.nDni !== undefined && typeof values.nDni === 'number' && !regexDni.test(values.nDni.toString())) {
    newErrors.nDni = 'The DNI must be a valid number and have a maximum of 15 digits.';
  }

// Validación de fecha de nacimiento
if (values.birthday) {
  // Verificar si cumple con el formato 'yyyy-mm-dd'
  if (!regexBirthday.test(values.birthday)) {
    newErrors.birthday = 'The date of birth must be in the format yyyy-mm-dd.';
  } else {
    const birthDate = new Date(values.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Verificar si la fecha de nacimiento es futura
    if (birthDate > today) {
      newErrors.birthday = 'The date of birth cannot be in the future.';
    }
    // Verificar si el usuario es menor de edad
    else if (age < 18 || (age === 18 && monthDifference < 0)) {
      newErrors.birthday = 'You must be 18 years of age or older.';
    }
  }
}

  // Validación de teléfono
  if (values.phone && !regexPhone.test(values.phone)) {
    newErrors.phone = 'The phone must be a valid number that begins with "+" followed by 1 to 15 digits with no spaces.';
  }

  return newErrors;
};
