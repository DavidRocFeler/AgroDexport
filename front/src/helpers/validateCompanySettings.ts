import { ICompany } from '@/interface/types';

export const validateCompanySettings = (values: ICompany): Partial<Record<keyof ICompany, string>> => {
  const newErrors: Partial<Record<keyof ICompany, string>> = {};

  const regexName = /^[a-zA-ZÀ-ÿ\s]{3,50}$/; // Company name: 3 to 50 letters and spaces
  const regexPostalCode = /^\d{5}$/; // Postal code: 5 digits
  const regexWebsite = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/; // URL validation

  // Company name validation
  if (!values.company_name || !regexName.test(values.company_name)) {
    newErrors.company_name = 'The company name is required and must contain between 3 and 50 valid characters.';
  }

  // Tax identification number validation (convert to number if it's a string)
  const taxIdNumber = typeof values.tax_identification_number === 'string'
    ? Number(values.tax_identification_number)
    : values.tax_identification_number;

  if (
    taxIdNumber === undefined ||
    typeof taxIdNumber !== 'number' ||
    !/^\d{8,15}$/.test(taxIdNumber.toString())
  ) {
    newErrors.tax_identification_number = 'The tax identification number must be a valid number with 8 to 15 digits.';
  }

  // Address validation
  if (!values.address || values.address.length < 3) {
    newErrors.address = 'The address is required and must be at least 3 characters long.';
  }

  // Postal code validation
  if (values.postal_code && !regexPostalCode.test(values.postal_code)) {
    newErrors.postal_code = 'The postal code must be a 5-digit number.';
  }

  // City validation
  if (!values.city || !regexName.test(values.city)) {
    newErrors.city = 'The city is required and must contain between 3 and 50 valid characters.';
  }

  // State validation
  if (!values.state || !regexName.test(values.state)) {
    newErrors.state = 'The state is required and must contain between 3 and 50 valid characters.';
  }

  // Country validation
  if (!values.country || !regexName.test(values.country)) {
    newErrors.country = 'The country is required and must contain between 3 and 50 valid characters.';
  }

  // Industry validation
  if (!values.industry || !regexName.test(values.industry)) {
    newErrors.industry = 'The industry is required and must contain between 3 and 50 valid characters.';
  }

  // Company description validation
  if (values.company_description && values.company_description.length < 10) {
    newErrors.company_description = 'The company description must be at least 10 characters long.';
  }

  // Website validation
  if (values.website && !regexWebsite.test(values.website)) {
    newErrors.website = 'The website must be a valid URL.';
  }

  return newErrors;
};


