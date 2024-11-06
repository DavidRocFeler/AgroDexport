import { ISettingsUserProps } from '@/interface/types';

export const validateUserSettings = (values: ISettingsUserProps): Partial<Record<keyof ISettingsUserProps, string>> => {
  const newErrors: Partial<Record<keyof ISettingsUserProps, string>> = {};

  // Expresiones regulares para validaciones
  const regexPhone = /^\+\d{1,15}$/;  // Validación del teléfono
  const regexName = /^[a-zA-ZÀ-ÿ]{3,15}( [a-zA-ZÀ-ÿ]{3,15})?$/;  // Nombre (debe tener entre 3 y 15 letras, opcionalmente puede incluir un segundo nombre)
  const regexLastName = /^[a-zA-ZÀ-ÿ]{3,15}( [a-zA-ZÀ-ÿ]{3,15})?$/;  // Apellido (debe tener entre 3 y 15 letras, opcionalmente puede incluir un segundo apellido)
  const regexDni = /^[a-zA-Z0-9]{1,15}$/;  // DNI (hasta 15 caracteres alfanuméricos)

  // Validación de nombre de usuario
  if (!values.user_name || !regexName.test(values.user_name)) {
    newErrors.user_name = 'The name is mandatory and must contain between 3 and 15 letters. You can include a middle name.';
  }

  // Validación de apellido
  if (!values.user_lastname || !regexLastName.test(values.user_lastname)) {
    newErrors.user_lastname = 'The surname is mandatory and must contain between 3 and 15 letters. It can include a second surname.';
  }

  // Validación de DNI
  if (values.nDni !== undefined && typeof values.nDni === 'number' && !regexDni.test(values.nDni.toString())) {
    newErrors.nDni = 'The DNI must be a valid number and have a maximum of 15 digits.';
  }

  // Validación de fecha de nacimiento
  if (values.birthday) {
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

  // Validación de teléfono
  if (values.phone && !regexPhone.test(values.phone)) {
    newErrors.phone = 'The phone must be a valid number that begins with "+" followed by 1 to 15 digits with no spaces.';
  }

  return newErrors;
};
