import { IUserData } from "@/interface/types";

export const validateUserData = (userData: IUserData): boolean => {
  if (!userData.name || !userData.lastName) {
    throw new Error("El nombre y apellido son obligatorios");
  }

  if (!userData.nDni) {
    throw new Error("El número de documento es obligatorio");
  }

  if (!userData.phone) {
    throw new Error("El número de teléfono es obligatorio");
  }

  // Validación básica del formato de fecha
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(userData.birthdate)) {
    throw new Error("El formato de fecha debe ser YYYY-MM-DD");
  }

  return true;
};
