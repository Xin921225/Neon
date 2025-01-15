import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import * as moment from 'moment';
import { state, provinces,countries } from './values';
import { isNil } from 'ramda';

const isNotNil = (value) => !isNil(value);
export const invalidEmail = 'Email must contain "@" and a valid domain,Special characters are not allowed.';
export const noName = 'There must be either a Full or First Name.';
export const countryAlert = 'The country must be valid.';
export const usaStateAlert = 'The state must be valid for a US address.';
export const usaZipAlert = 'The ZIP code must be valid for a US address.';
export const canadaProvAlert = 'The province must be valid for a Canadian address.';
export const canadaZipAlert = 'The ZIP code must be valid for a Canadian address.';
export const invalidPhoneNumber = 'Phone number must be valid and in the correct format.';
export const invalidDateFormat = 'Date must be in the format "yyyy-mm-dd".';
export const invalidPhoneFormat = 'Phone number format is incorrect.';

export const USA = ['US', 'United States'];
export const Canada = ['CA', 'Canada'];


export const vlookup = (
  record,
  referenceFieldKey,
  lookupFieldKey,
  targetFieldKey
) => {
  console.log("Initial Record: " + JSON.stringify(record));
  const links = record.getLinks(referenceFieldKey);
  console.log("Linked Records: " + JSON.stringify(links));
  const lookupValue = links?.[0]?.[lookupFieldKey];
  console.log(
    "Reference Field Key: " +
      referenceFieldKey +
      " : " +
      "Lookup Value: " +
      lookupValue
  );

  if (isNotNil(lookupValue)) {
    record.set(targetFieldKey, lookupValue);

  }
};

export function validateEmail(email: string): boolean {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmail.test(email) && !/\.{2,}/.test(email); // Prevents consecutive dots in local-part
}


// US ZIP code validation (supports 5 or 9 digits with or without dash)
export function validateUSZipCode(zipCode: string): boolean {
  // Remove any extra spaces or dashes before validation
  const normalizedZip = zipCode.replace(/\s|-/g, '');
  const zipRegEx = /^\d{5}(\d{4})?$/;
  return zipRegEx.test(normalizedZip);
}


export function isValidDate(dateString: string): boolean {
  const dateFormats = ['YYYY-MM-DD'];
  const dateTimeFormats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD H:mm:ss', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD H:mm'];

  if (dateString.includes(':')) {
    return moment(dateString, dateTimeFormats, true).isValid();
  } else {
    return moment(dateString, dateFormats, true).isValid();
  }
}

// Convert any valid date or datetime to ISO format
export function convertDateToISO(dateString: string): string | null {
  const dateFormats = [
    'MM/DD/YYYY', 'M/D/YYYY', 'MM/DD/YY', 'M/D/YY',
    'MM.DD.YYYY', 'M.D.YYYY', 'MM.DD.YY', 'M.D.YY',
    'YYYY/MM/DD', 'YYYY.MM.DD', 'YYYY-MM-DD', 'YYYY.M.D', 'YY.MM.DD', 'YY.M.D', 
    'D-MMM-YYYY', 'DD-MMM-YYYY', 'D-MMMM-YYYY', 'DD-MMMM-YYYY',
    'MMM D, YYYY', 'MMMM D, YYYY', 'D MMM YYYY', 'DD MMM YYYY',
    'DD/MM/YY', 'DD.MM.YY', 'MM-DD-YYYY', 'DD-MM-YYYY', 'M-D-YYYY', 'M-D-YY', 'MM-DD-YY',
    // Additional formats
    'D/MMM/YY',        // e.g., 3/Oct/21
    'D MMMM, YY',      // e.g., 3 October, 21
    'MMM D YY',        // e.g., Oct 3 21
    'DD MMMM, YYYY',   // e.g., 03 October, 2021
    'DD/MMM/YY',       // e.g., 03/Oct/21
    'D MMM, YYYY',     // e.g., 3 Oct, 2021
    'MMMM D, YY',      // e.g., October 3, 21
    'YYYY/MMM/DD',     // e.g., 2021/Oct/03
    'DD MMMM YYYY',    // e.g., 03 October 2021
    'DD Month YYYY',   // e.g., 03 October 2021
    'D Month, YYYY',   // e.g., 3 October, 2021
    'Month D, YYYY',   // e.g., October 3, 2021
    'YYYYMMDD',        // e.g., 20211003
    'YY/MM/DD',        // e.g., 21/10/03
    'DD/MM/YYYY',      // e.g., 03/10/2021
    'DD.MM.YYYY',      // e.g., 03.10.2021
    'D.M.YYYY',        // e.g., 3.10.2021
    'DD-MM-YY',        // e.g., 03-10-21
    'D-M-YYYY',        // e.g., 3-10-2021
    'DD/MMM/YYYY',     // e.g., 03/Oct/2021
    'D MMMM YYYY',     // e.g., 3 October 2021
    'YYYYMMDD',        // e.g., 20211003 (added twice, so remove one)
  ];
  
  const dateTimeFormats = [
    'MM/DD/YYYY HH:mm', 'MM/DD/YYYY H:mm', 'M/D/YYYY HH:mm', 'M/D/YYYY H:mm',
    'MM/DD/YYYY HH:mm:ss', 'MM/DD/YYYY H:mm:ss', 'M/D/YYYY HH:mm:ss', 'M/D/YYYY H:mm:ss',
    'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD H:mm:ss', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD H:mm',
    'YYYY-M-D HH:mm', 'YYYY-M-D H:mm:ss',
    // Additional formats
    'DD-MMM-YYYY HH:mm:ss',     // e.g., 03-Oct-2021 14:30:45
    'D MMM YYYY, H:mm A',       // e.g., 3 Oct 2021, 2:30 PM
    'MMMM D, YYYY HH:mm',       // e.g., October 3, 2021 14:30
    'MMM D, YYYY H:mm:ss A',    // e.g., Oct 3, 2021 2:30:45 PM
    'D/MMM/YYYY HH:mm:ss',      // e.g., 3/Oct/2021 14:30:45
    'YYYY-MM-DDTHH:mm:ssZ',     // e.g., 2021-10-03T14:30:45Z (ISO 8601 format)
    'YYYY-MM-DD HH:mm:ss.SSS',  // e.g., 2021-10-03 14:30:45.123
    'YYYY/MM/DD HH:mm:ss',      // e.g., 2021/10/03 14:30:45
    'DD/MM/YYYY HH:mm:ss',      // e.g., 03/10/2021 14:30:45
    'DD.MM.YYYY HH:mm:ss',      // e.g., 03.10.2021 14:30:45
    'D.M.YYYY HH:mm:ss',        // e.g., 3.10.2021 14:30:45
    'DD-MM-YYYY HH:mm:ss',      // e.g., 03-10-2021 14:30:45
    'D-M-YYYY HH:mm:ss',        // e.g., 3-10-2021 14:30:45
    'YYYYMMDDTHHmmssZ',         // e.g., 20211003T143045Z
    'YYYY-MM-DDTHH:mm:ss',      // e.g., 2021-10-03T14:30:45
    'YYYY/MM/DD HH:mm',         // e.g., 2021/10/03 14:30
    'DD MMMM YYYY HH:mm',       // e.g., 03 October 2021 14:30
    'DD/MMM/YYYY HH:mm',        // e.g., 03/Oct/2021 14:30
    'D MMM YYYY HH:mm',         // e.g., 3 Oct 2021 14:30
    'MMM D, YYYY HH:mm',        // e.g., Oct 3, 2021 14:30
    'MMMM D, YYYY H:mm A',      // e.g., October 3, 2021 2:30 PM
    'D MMM, YYYY H:mm A',       // e.g., 3 Oct, 2021 2:30 PM
    'YYYY/MM/DDTHH:mm:ssZ',     // e.g., 2021/10/03T14:30:45Z
    'YYYYMMDD HHmmss',          // e.g., 20211003 143045
  ];
  
  

  // Determine if time is included
  if (dateString.includes(':')) {
    const parsedDateTime = moment(dateString, dateTimeFormats, true);
    if (parsedDateTime.isValid()) {
      // Ensure missing seconds default to 00 but without appending extra :00
      return parsedDateTime.format('YYYY-MM-DD HH:mm:ss');
    }
  } else {
    const parsedDate = moment(dateString, dateFormats, true);
    if (parsedDate.isValid()) {
      return parsedDate.format('YYYY-MM-DD');
    }
  }

  return null;
}


export function isBlank(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === '' || value.trim() === 'null';
}


export function is_validPhoneNumber(phoneNumber: string, country: CountryCode = 'US'): boolean {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber, country);
  return parsedNumber ? parsedNumber.isValid() : false;
}



export function validatePhoneFormat(phoneNumber: string): boolean {
  const phoneFormat = /^(\+?\d{1,4}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}(?:\s?(?:ext|x)\.?\s?\d+)?$/;
  return phoneFormat.test(phoneNumber);
}

// Validate country code by checking against valid countries list
export function isCountryCode(value: string): boolean {
  // Make the comparison case-insensitive
  return countries.map(c => c.toUpperCase()).includes(value.toUpperCase());
}
export function validateAddress(addressCountry: string, addressStateProvince: string, addressPostalCode: string): string[] {
  const errors: string[] = [];

  // Normalize country and state/province to uppercase for case-insensitive comparison
  const normalizedCountry = addressCountry ? addressCountry.toUpperCase() : '';
  const normalizedState = addressStateProvince ? addressStateProvince.toUpperCase() : '';

  // If state or ZIP code is provided and country is blank or invalid, add country error
  if ((!isBlank(addressStateProvince) || !isBlank(addressPostalCode)) && isBlank(addressCountry)) {
    if (!state.map(s => s.toUpperCase()).includes(normalizedState) && !validateUSZipCode(addressPostalCode)) {
      errors.push(countryAlert);
    }
  }

  // Validate country if provided (case-insensitive)
  if (!isBlank(addressCountry) && !isCountryCode(normalizedCountry)) {
    errors.push(countryAlert);
  }

  // Validate state for US address (case-insensitive)
  if (!isBlank(addressStateProvince) && (USA.some(c => c.toUpperCase() === normalizedCountry) || isBlank(addressCountry))) {
    if (!state.some(s => s.toUpperCase() === normalizedState)) {
      errors.push(usaStateAlert);
    }
  }

  // Validate ZIP code for US address
  if (!isBlank(addressPostalCode) && (USA.some(c => c.toUpperCase() === normalizedCountry) || isBlank(addressCountry))) {
    if (!validateUSZipCode(addressPostalCode)) {
      errors.push(usaZipAlert);
    }
  }

  // Validate province for Canadian address (case-insensitive)
  if (!isBlank(addressStateProvince) && Canada.some(c => c.toUpperCase() === normalizedCountry)) {
    if (!provinces.some(p => p.toUpperCase() === normalizedState)) {
      errors.push(canadaProvAlert);
    }
  }

  // Validate ZIP code for Canadian address
  if (!isBlank(addressPostalCode) && Canada.some(c => c.toUpperCase() === normalizedCountry)) {
    const zipRegEx = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!zipRegEx.test(addressPostalCode)) {
      errors.push(canadaZipAlert);
    }
  }

  return errors;
}
