import { ISettingsUserProps } from '@/interface/types';

export const validateUserSettings = (values: ISettingsUserProps): Partial<Record<keyof ISettingsUserProps, string>> => {
  const newErrors: Partial<Record<keyof ISettingsUserProps, string>> = {};

  const regexDni = /^[a-zA-Z0-9]{1,15}$/; 
  const regexPhone = /^\+\d{1,15}$/;
  const regexName = /^[a-zA-ZÀ-ÿ]{3,15}( [a-zA-ZÀ-ÿ]{3,15})?$/; // Nombre de 3 a 15 letras
  const regexLastName = /^[a-zA-ZÀ-ÿ]{3,15}( [a-zA-ZÀ-ÿ]{3,15})?$/;

  if (!values.user_name || !regexName.test(values.user_name)) {
    newErrors.user_name = 'El nombre es obligatorio y debe contener entre 3 y 15 letras. Puede incluir un segundo nombre.';
  }

  if (!values.user_lastname || !regexLastName.test(values.user_lastname)) {
    newErrors.user_lastname = 'El apellido es obligatorio y debe contener entre 3 y 15 letras. Puede incluir un segundo apellido.';
  }

  if (values.nDni !== undefined && typeof values.nDni === 'number' && !regexDni.test(values.nDni.toString())) {
    newErrors.nDni = 'El DNI debe ser un número válido y tener un máximo de 15 dígitos.';
  }

  if (values.birthday) {
    const birthDate = new Date(values.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Verificar si la fecha de nacimiento es futura
    if (birthDate > today) {
      newErrors.birthday = 'La fecha de nacimiento no puede ser en el futuro.';
    } 
    // Verificar si el usuario es menor de edad
    else if (age < 18 || (age === 18 && monthDifference < 0)) {
      newErrors.birthday = 'Debes ser mayor de 18 años.';
    }
  }

  if (values.phone && !regexPhone.test(values.phone)) {
    newErrors.phone = 'El teléfono debe ser un número válido que comience con "+" seguido de 1 a 15 dígitos sin espacios.';
  }

  return newErrors;
};