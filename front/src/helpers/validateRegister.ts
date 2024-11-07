import { ISignUpForm } from "@/interface/types";

export const validateRegister = (data: ISignUpForm): string[] => {
  const errors: string[] = [];

  // Validación del nombre
  const nameRegex = /^[A-Za-zÁ-ÿ]{3,}(?:\s[A-Za-zÁ-ÿ]{3,})*$/;
  if (data.user_name.trim() === "") errors.push("Name is required");
  else if (!nameRegex.test(data.user_name)) errors.push("Name must contain only letters and spaces, with each word having at least 3 letters.");


  // Validación del apellido
  if (data.user_lastname.trim() === "") errors.push("Last name is required");
  else if (!nameRegex.test(data.user_lastname)) errors.push("Last name must only contain letters and spaces, with each word having at least 3 letters.");

  // Validación del correo
  const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|protonmail\.com|zoho\.com|aol\.com|mail\.com|gmx\.com|yandex\.com|tutanota\.com|fastmail\.com|rediffmail\.com|qq\.com|163\.com)$/;
  if (data.email.trim() === "") errors.push("Email is required");
  else if (!emailRegex.test(data.email)) errors.push("Email is not valid");

  // Validación de la contraseña
  if (data.password.trim() === "") errors.push("Password is required");
  if (data.password !== data.confirm_password) errors.push("Passwords do not match");

  // Validación del rol
  if (data.role_name === null) errors.push("Please select if you are a buyer or supplier");

  // Validación de la edad
  if (!data.isOlder) errors.push("You must confirm that you are of legal age");

  return errors;
};
