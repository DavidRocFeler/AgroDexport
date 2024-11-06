import { IShippingAddress } from "@/interface/types";

export const validateShippingAddress = (
  values: IShippingAddress
): Partial<Record<keyof IShippingAddress, string>> => {
  const newErrors: Partial<Record<keyof IShippingAddress, string>> = {};

  const regexName = /^[a-zA-ZÀ-ÿÑñ\s]+$/; // Name and surname: only letters and spaces
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation
  const regexPostalCode = /^[a-zA-Z0-9\s\-]+$/; // Postal code: letters, numbers, spaces, and hyphens
  const regexAddress = /^[a-zA-Z0-9\s\-,.#/]+$/; // Address: letters, numbers, spaces, commas, periods, hyphens, and slashes

  // Contact name validation
  if (!values.contact_name || values.contact_name.trim().length === 0) {
    newErrors.contact_name = 'Contact name is required and cannot consist only of spaces.';
  } else if (!regexName.test(values.contact_name)) {
    newErrors.contact_name = 'The contact name should only contain letters and spaces.';
  } else if (values.contact_name.length < 1 || values.contact_name.length > 50) {
    newErrors.contact_name = 'The contact name must be between 1 and 50 characters.';
  }

  // Contact last name validation
  if (!values.contact_lastname || values.contact_lastname.trim().length === 0) {
    newErrors.contact_lastname = 'Contact last name is required and cannot consist only of spaces.';
  } else if (!regexName.test(values.contact_lastname)) {
    newErrors.contact_lastname = 'The contact last name should only contain letters and spaces.';
  } else if (values.contact_lastname.length < 1 || values.contact_lastname.length > 50) {
    newErrors.contact_lastname = 'The contact last name must be between 1 and 50 characters.';
  }

   // Contact email validation (only if email is defined)
   if (values.contact_email && !regexEmail.test(values.contact_email)) {
    newErrors.contact_email = 'Email is required and must be valid.';
  } else if (!values.contact_email) {
    newErrors.contact_email = 'Email is required.';
  }

  // Address validation
  if (!values.address || values.address.trim().length === 0) {
    newErrors.address = 'Address is required and cannot consist only of spaces.';
  } else if (values.address.length < 1 || values.address.length > 255) {
    newErrors.address = 'The address must be between 1 and 255 characters.';
  } else if (!regexAddress.test(values.address)) {
    newErrors.address = 'The address can only contain letters, numbers, spaces, commas, periods, hyphens, and slashes.';
  }

  // Postal code validation (only if postal_code is defined)
  if (values.postal_code && !regexPostalCode.test(values.postal_code)) {
    newErrors.postal_code = 'Postal code must be a 5-digit number.';
  } else if (values.postal_code === undefined) {
    newErrors.postal_code = 'Postal code is required.';
  }

  // City validation
  if (!values.city || values.city.trim().length === 0) {
    newErrors.city = 'City is required and cannot consist only of spaces.';
  } else if (values.city.length < 1 || values.city.length > 100) {
    newErrors.city = 'The city name must be between 1 and 100 characters.';
  } else if (!regexName.test(values.city)) {
    newErrors.city = 'The city can only contain letters, spaces, hyphens, apostrophes, and periods.';
  }

  // State validation
  if (!values.state || values.state.trim().length === 0) {
    newErrors.state = 'State is required and cannot consist only of spaces.';
  } else if (values.state.length < 1 || values.state.length > 100) {
    newErrors.state = 'The state name must be between 1 and 100 characters.';
  } else if (!regexName.test(values.state)) {
    newErrors.state = 'The state can only contain letters, spaces, hyphens, apostrophes, and periods.';
  }

  // Country validation
  if (!values.country || values.country.trim().length === 0) {
    newErrors.country = 'Country is required and cannot consist only of spaces.';
  } else if (values.country.length < 1 || values.country.length > 100) {
    newErrors.country = 'The country name must be between 1 and 100 characters.';
  } else if (!regexName.test(values.country)) {
    newErrors.country = 'The country can only contain letters, spaces, hyphens, apostrophes, and periods.';
  }

  return newErrors;
};
