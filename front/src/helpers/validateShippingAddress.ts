import { IShippingAddress } from "@/interface/types";

export const validateShippingAddress = (
  values: IShippingAddress
): Partial<Record<keyof IShippingAddress, string>> => {
  const newErrors: Partial<Record<keyof IShippingAddress, string>> = {};

  const regexName = /^[a-zA-ZÀ-ÿ\s]{3,50}$/; // Nombres y apellidos: 3 a 50 letras y espacios
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación de email
  const regexPostalCode = /^\d{5}$/; // Código postal: 5 dígitos
  const regexAddress = /^.{5,100}$/; // Dirección: entre 5 y 100 caracteres

  // Validación del nombre de contacto
  if (!values.contact_name || !regexName.test(values.contact_name)) {
    newErrors.contact_name = 'El nombre de contacto es obligatorio y debe contener entre 3 y 50 caracteres válidos.';
  }

  // Validación del apellido de contacto
  if (!values.contact_lastname || !regexName.test(values.contact_lastname)) {
    newErrors.contact_lastname = 'El apellido de contacto es obligatorio y debe contener entre 3 y 50 caracteres válidos.';
  }

  // Validación del correo electrónico de contacto
  if (!values.contact_email || !regexEmail.test(values.contact_email)) {
    newErrors.contact_email = 'El correo electrónico es obligatorio y debe ser válido.';
  }

  // Validación de la dirección
  if (!values.address || !regexAddress.test(values.address)) {
    newErrors.address = 'La dirección es obligatoria y debe tener entre 5 y 100 caracteres.';
  }

  // Validación del código postal
  if (values.postal_code && !regexPostalCode.test(values.postal_code)) {
    newErrors.postal_code = 'El código postal debe ser un número de 5 dígitos.';
  }

  // Validación de la ciudad
  if (!values.city || !regexName.test(values.city)) {
    newErrors.city = 'La ciudad es obligatoria y debe contener entre 3 y 50 caracteres válidos.';
  }

  // Validación del estado
  if (!values.state || !regexName.test(values.state)) {
    newErrors.state = 'El estado es obligatorio y debe contener entre 3 y 50 caracteres válidos.';
  }

  // Validación del país
  if (!values.country || !regexName.test(values.country)) {
    newErrors.country = 'El país es obligatorio y debe contener entre 3 y 50 caracteres válidos.';
  }

  return newErrors;
};
