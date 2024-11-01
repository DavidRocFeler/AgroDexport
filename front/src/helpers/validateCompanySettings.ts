import { ICompany } from '@/interface/types';

export const validateCompanySettings = (values: ICompany): Partial<Record<keyof ICompany, string>> => {
  const newErrors: Partial<Record<keyof ICompany, string>> = {};

  const regexName = /^[a-zA-ZÀ-ÿ\s]{3,50}$/; // Nombre de la empresa: 3 a 50 letras y espacios
  const regexPostalCode = /^\d{5}$/; // Código postal: 5 dígitos
  const regexWebsite = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/; // Validación de URL

  // Validación del nombre de la empresa
  if (!values.company_name || !regexName.test(values.company_name)) {
    newErrors.company_name = 'El nombre de la empresa es obligatorio y debe contener entre 3 y 50 caracteres válidos.';
  }

  // Validación del número de identificación fiscal
  if (values.tax_identification_number === undefined || typeof values.tax_identification_number !== 'number' || values.tax_identification_number <= 0) {
    newErrors.tax_identification_number = 'El número de identificación fiscal debe ser un número válido y mayor que cero.';
  }

  // Validación de la dirección
  if (!values.address || values.address.length < 5) {
    newErrors.address = 'La dirección es obligatoria y debe tener al menos 5 caracteres.';
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

  // Validación de la industria
  if (!values.industry || !regexName.test(values.industry)) {
    newErrors.industry = 'La industria es obligatoria y debe contener entre 3 y 50 caracteres válidos.';
  }

  // Validación del sitio web
  if (values.website && !regexWebsite.test(values.website)) {
    newErrors.website = 'El sitio web debe ser una URL válida.';
  }

  // Validación de la descripción de la empresa
  if (values.company_description && values.company_description.length < 10) {
    newErrors.company_description = 'La descripción de la empresa debe tener al menos 10 caracteres.';
  }

  return newErrors;
};
