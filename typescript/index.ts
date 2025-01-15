/**
 * This code is used in Flatfile's Custom App Tutorial
 * https://flatfile.com/docs/apps/custom
 *
 * To see all of Flatfile's code examples go to: https://github.com/FlatFilers/flatfile-docs-kitchen-sink
 */

import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { FlatfileRecord, bulkRecordHook } from "@flatfile/plugin-record-hook";
import { FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import { configureSpace } from "@flatfile/plugin-space-configure";
import { autocast } from "@flatfile/plugin-autocast";
import { exportWorkbookPlugin } from "@flatfile/plugin-export-workbook";
import { dedupePlugin } from "@flatfile/plugin-dedupe";
import * as R from 'remeda';


import { contactIndSheet } from "./contacts_Individual";
import { contactOrgSheet } from "./contacts_Organization";
import { donationIndSheet } from "./donations_Individual";
import { donationOrgSheet } from "./donations_Organization";



import { state, countries } from "./hooks/values";
import { CountryCode } from 'libphonenumber-js';
import {
  invalidEmail, noName, countryAlert, usaStateAlert, usaZipAlert, canadaProvAlert, canadaZipAlert, invalidPhoneNumber, invalidDateFormat, invalidPhoneFormat, USA,
  validateEmail, is_validPhoneNumber, validateUSZipCode, isValidDate, validatePhoneFormat, isCountryCode, isBlank, convertDateToISO, validateAddress
} from "./hooks/validation";


const validPaymentMethods = [
  'ach', 'cash', 'cash_app', 'check', 'credit_card', 'direct', 'gift_card', 'givecard', 'in_kind', 'invoice', 'match', 'other', 'paypal', 'payroll', 'square', 'venmo', 'zelle'
];

export default function flatfileEventListener(listener: FlatfileListener) {
  listener.on("**", (event: FlatfileEvent) => {
    console.log(`Received event: ${event.topic}`);
  });


  listener.use(
    configureSpace({
      workbooks: [
        {
          name: "Individual Contacts Workbook",
          sheets: [contactIndSheet,donationIndSheet ],
          actions: [
            {
              operation: "downloadWorkbook",
              label: "Download All Contacts",
              description: "Downloads all Individual Contacts",
              primary: true,
            },
            {
              operation: "downloadInvalid",
              label: "Download Invalid Rows",
              description: "Downloads only invalid Individual Contacts",
              primary: false,
            },
          ],
        },
        {
          name: "Organization Contacts Workbook",
          sheets: [contactOrgSheet],
          actions: [
            {
              operation: "downloadWorkbook",
              label: "Download All Contacts",
              description: "Downloads all Organization Contacts",
              primary: true,
            },
            {
              operation: "downloadInvalid",
              label: "Download Invalid Rows",
              description: "Downloads only invalid Organization Contacts",
              primary: false,
            },
          ],
        },
       
        {
          name: "Organization Donations Workbook",
          sheets: [donationOrgSheet],
          actions: [
            {
              operation: "downloadWorkbook",
              label: "Download All Donations",
              description: "Downloads all Organization Donations",
              primary: true,
            },
            {
              operation: "downloadInvalid",
              label: "Download Invalid Rows",
              description: "Downloads only invalid Organization Donations",
              primary: false,
            },
          ],
        },
        
      ],
    })
  );

  
  listener.use(ExcelExtractor());

  listener.use(
    bulkRecordHook("contactsIndLinked", (records: FlatfileRecord[]) => {
      records.map((record) => {
        let fullName = `${record.get('fullName')}`.trim();
        let firstName = `${record.get('firstName')}`.trim();
        let lastName = `${record.get('lastName')}`.trim();
        const externalId = `${record.get('externalId')}`.trim();
        const addressLine1 = `${record.get('addressLine1')}`.trim();
        const addressLine2 = `${record.get('addressLine2')}`.trim();
        const addressCity = `${record.get('addressCity')}`.trim();
        const addressStateProvince = `${record.get('addressStateProvince')}`.trim();
        const addressCountry = `${record.get('addressCountry')}`.trim();
        const addressPostalCode = `${record.get('addressPostalCode')}`.trim();
        const personalEmail = `${record.get('personalEmail')}`.trim();
        const secondaryEmail = `${record.get('secondaryEmail')}`.trim();
        const workEmail = `${record.get('workEmail')}`.trim();
        const mobilePhone = `${record.get('mobilePhone')}`.trim();
        const workPhone = `${record.get('workPhone')}`.trim();
        const homePhone = `${record.get('homePhone')}`.trim();
        const faxPhone = `${record.get('faxPhone')}`.trim();
        let dateOfBirth = `${record.get('dateOfBirth')}`.trim();
        const Emailtype = `${record.get('Emailtype')}`.trim();
        const workAddressLine1 = `${record.get('workAddressLine1')}`.trim();
        const workAddressLine2 = `${record.get('workAddressLine2')}`.trim();
        const workAddressCity = `${record.get('workAddressCity')}`.trim();
        const workAddressStateProvince = `${record.get('workAddressStateProvince')}`.trim();
        const workAddressCountry = `${record.get('workAddressCountry')}`.trim();
        const workAddressPostalCode = `${record.get('workAddressPostalCode')}`.trim();
        const Addresstype = `${record.get('Addresstype')}`.trim();
        const warning = `${record.get('warning')}`.trim();
        
         // Move address to work address if Addresstype contains "work" or "business"
         if (Addresstype.toLowerCase().includes('work') || Addresstype.toLowerCase().includes('business')) {
          record.set('workAddressLine1', addressLine1);
          record.set('workAddressLine2', addressLine2);
          record.set('workAddressCity', addressCity);
          record.set('workAddressStateProvince', addressStateProvince);
          record.set('workAddressCountry', addressCountry);
          record.set('workAddressPostalCode', addressPostalCode);
        
          // Clear the original address fields
          record.set('addressLine1', '');
          record.set('addressLine2', '');
          record.set('addressCity', '');
          record.set('addressStateProvince', '');
          record.set('addressCountry', '');
          record.set('addressPostalCode', '');
        }

        if (Emailtype.toLowerCase().includes('work') || Emailtype.toLowerCase().includes('business')) {
          if (!isBlank(personalEmail)) {
            record.set('workEmail', personalEmail);
            record.set('personalEmail', ''); // Clear the personal email field
          }
        } 


    

        // Validate name fields
        if (isBlank(firstName) && isBlank(fullName)) {
          if (!isBlank(lastName) && lastName.toLowerCase() !== 'null') {
            firstName = lastName;
            lastName = '';
          } else if (!isBlank(personalEmail)) {
            firstName = personalEmail;
            lastName = ''; // Ensure last name is blank
          } else {
            record.addError('fullName', noName);
            record.addError('firstName', noName);
          }
          record.set('firstName', firstName === 'null' ? '' : firstName);
          record.set('lastName', lastName === 'null' ? '' : lastName);
        }


        // Validate email fields
        if (!isBlank(personalEmail)) {
          if (!validateEmail(personalEmail)) {
            record.addError('personalEmail', invalidEmail);
          }
        }
        if (!isBlank(secondaryEmail)) {
          if (!validateEmail(secondaryEmail)) {
            record.addError('secondaryEmail', invalidEmail);
          }
        }
        if (!isBlank(workEmail)) {
          if (!validateEmail(workEmail)) {
            record.addError('workEmail', invalidEmail);
          }
        }

        // Ensure primary, secondary, and work emails don't match
        if (!isBlank(personalEmail) && !isBlank(secondaryEmail) && personalEmail === secondaryEmail) {
          record.addError('secondaryEmail', 'Secondary email must be different from primary email.');
        }
        if (!isBlank(personalEmail) && !isBlank(workEmail) && personalEmail === workEmail) {
          record.addError('workEmail', 'Work email must be different from primary email.');
        }
        if (!isBlank(secondaryEmail) && !isBlank(workEmail) && secondaryEmail === workEmail) {
          record.addError('workEmail', 'Work email must be different from secondary email.');
        }

        // Validate phone fields
        if (!isBlank(mobilePhone)) {
          if (!validatePhoneFormat(mobilePhone)) {
            record.addError('mobilePhone', invalidPhoneFormat);
          } else if (isCountryCode(addressCountry) && !is_validPhoneNumber(mobilePhone, addressCountry as CountryCode)) {
            record.addError('mobilePhone', invalidPhoneNumber);
          }
        }

        if (!isBlank(workPhone)) {
          if (!validatePhoneFormat(workPhone)) {
            record.addError('workPhone', invalidPhoneFormat);
          } else if (isCountryCode(addressCountry) && !is_validPhoneNumber(workPhone, addressCountry as CountryCode)) {
            record.addError('workPhone', invalidPhoneNumber);
          }
        }

        if (!isBlank(homePhone)) {
          if (!validatePhoneFormat(homePhone)) {
            record.addError('homePhone', invalidPhoneFormat);
          } else if (isCountryCode(addressCountry) && !is_validPhoneNumber(homePhone, addressCountry as CountryCode)) {
            record.addError('homePhone', invalidPhoneNumber);
          }
        }

        if (!isBlank(faxPhone)) {
          if (!validatePhoneFormat(faxPhone)) {
            record.addError('faxPhone', invalidPhoneFormat);
          } else if (isCountryCode(addressCountry) && !is_validPhoneNumber(faxPhone, addressCountry as CountryCode)) {
            record.addError('faxPhone', invalidPhoneNumber);
          }
        }

        // Convert and validate date of birth
        if (!isBlank(dateOfBirth)) {
          const convertedDate = convertDateToISO(dateOfBirth);
          if (convertedDate) {
            record.set('dateOfBirth', convertedDate); // Set the converted date back to the record
          } else if (!isValidDate(dateOfBirth)) {
            record.addError('dateOfBirth', invalidDateFormat);
          }
        }

        // Validate personal address fields
        const personalAddressErrors = validateAddress(addressCountry, addressStateProvince, addressPostalCode);
        personalAddressErrors.forEach(error => {
          if (error.includes('state')) {
            record.addError('addressStateProvince', error);
          } else if (error.includes('ZIP')) {
            record.addError('addressPostalCode', error);
          } else {
            record.addError('addressCountry', error);
          }
        });

        // Validate work address fields using the same validation logic
        const workAddressErrors = validateAddress(workAddressCountry, workAddressStateProvince, workAddressPostalCode);
        workAddressErrors.forEach(error => {
          if (error.includes('state')) {
            record.addError('workAddressStateProvince', error);
          } else if (error.includes('ZIP')) {
            record.addError('workAddressPostalCode', error);
          } else {
            record.addError('workAddressCountry', error);
          }
        });

        // Validate warning fields
        if (isBlank(personalEmail) && isBlank(addressLine1) && isBlank(externalId)) {
          
          record.addError('warning', 'No identifier, which may cause duplicates.');
         
        }


        return record;
      });
    })
  );

// Declare the uniqueCombinations set globally (to persist across operations)
let uniqueCombinations = new Set();

  listener.use(
    bulkRecordHook("contactsOrgLinked", (records: FlatfileRecord[]) => {
      records.map((record) => {
        const OrganizationExternalId = `${record.get('OrganizationExternalId')}`.trim();
        const orgName = `${record.get('organizationName')}`.trim();
        const orgEmail = `${record.get('organization_Email')}`.trim();
        const orgPhone = `${record.get('organization_Phone')}`.trim();
        const orgMobile = `${record.get('org_mobilePhone')}`.trim();
        const orgHome = `${record.get('org_homePhone')}`.trim();

        const orgAddrStateProvince = `${record.get('organization_addressStateProvince')}`.trim();
        const orgAddrCountry = `${record.get('organization_addressCountry')}`.trim();
        const orgAddrPostalCode = `${record.get('organization_addresspostalcode')}`.trim();
        const organization_addressLine1 = `${record.get('organization_addressLine1')}`.trim();

        const orgwarning = `${record.get('orgwarning')}`.trim();


    //Organization

        // Validate org name field
        if (isBlank(orgName)) {
          record.addError('organizationName', noName);
        }

        // Validate org email field
        if (!isBlank(orgEmail)) {
          if (!validateEmail(orgEmail)) {
            record.addError('organization_Email', invalidEmail);
          }
        }

        // Validate orgphone field
        if (!isBlank(orgPhone)) {
          if (!validatePhoneFormat(orgPhone)) {
            record.addError('organization_Phone', invalidPhoneFormat);
          } else if (isCountryCode(orgAddrCountry) && !is_validPhoneNumber(orgPhone, orgAddrCountry as CountryCode)) {
            record.addError('organization_Phone', invalidPhoneNumber);
          }
        }

        if (!isBlank(orgMobile)) {
          if (!validatePhoneFormat(orgMobile)) {
            record.addError('organization_Phone', invalidPhoneFormat);
          } else if (isCountryCode(orgAddrCountry) && !is_validPhoneNumber(orgMobile, orgAddrCountry as CountryCode)) {
            record.addError('organization_Phone', invalidPhoneNumber);
          }
        }

        if (!isBlank(orgHome)) {
          if (!validatePhoneFormat(orgHome)) {
            record.addError('organization_Phone', invalidPhoneFormat);
          } else if (isCountryCode(orgAddrCountry) && !is_validPhoneNumber(orgHome, orgAddrCountry as CountryCode)) {
            record.addError('organization_Phone', invalidPhoneNumber);
          }
        }

        // Validate org address fields
        const orgAddressErrors = validateAddress(orgAddrCountry, orgAddrStateProvince, orgAddrPostalCode);
        orgAddressErrors.forEach(error => {
          if (error.includes('state')) {
            record.addError('organization_addressStateProvince', error);
          } else if (error.includes('ZIP')) {
            record.addError('organization_addresspostalcode', error);
          } else {
            record.addError('organization_addressCountry', error);
          }
        });

  

        // Validate warning fields
        if (isBlank(orgEmail) && isBlank(organization_addressLine1) && isBlank(OrganizationExternalId)) {
          
          record.addError('orgwarning', 'No identifier, which may cause duplicates.');
         
        }

    
        return record;
      });
    })
  );


  listener.use(
    bulkRecordHook("donationsIndLinked", (records: FlatfileRecord[]) => {


      records.map((record) => {
        let d_fullName = `${record.get('d_fullName')}`.trim();
        let d_firstName = `${record.get('d_firstName')}`.trim();
        let d_lastName = `${record.get('d_lastName')}`.trim();
        const indexternalId = `${record.get('indexternalId')}`.trim();
        const d_personalEmail = `${record.get('d_personalEmail')}`.trim();
        let donationDate = `${record.get('donationDate')}`.trim();
        const tributeType = `${record.get('tributeType')}`.trim();
        const tributeName = `${record.get('tributeName')}`.trim();
        const donationAmount = `${record.get('donationAmount')}`.trim();
        let paymentMethod = `${record.get('paymentMethod')}`.trim().toLowerCase(); // Normalize to lowercase
        let paymentDescription = record.get('paymentDescription') ? `${record.get('paymentDescription')}`.trim() : '';

        const ind_warning = `${record.get('ind_warning')}`.trim();


        const validPaymentMethods = [
        'ach', 'cash', 'cash_app','cash app', 'check', 'credit_card', 'credit card','direct', 'gift_card', 'gift card','givecard', 'in_kind', 'in kind','invoice', 'match', 'other', 'paypal', 'payroll', 'square', 'venmo', 'zelle'
        ];
        

        

      

        // Validate name fields
        if (isBlank(d_firstName)&& (d_fullName) ) {
          if (!isBlank(d_lastName) && d_lastName.toLowerCase() !== 'null') {
            d_firstName = d_lastName;
            d_lastName = '';
          } else if (!isBlank(d_personalEmail)) {
            d_firstName = d_personalEmail;
            d_lastName = ''; // Ensure last name is blank
          } else {
            record.addError('d_fullName', noName);
            record.addError('d_firstName', noName);
          }
          record.set('d_firstName', d_firstName === 'null' ? '' : d_firstName);
          record.set('d_lastName', d_lastName === 'null' ? '' : d_lastName);
        }

    

       

      
        // Validate email fields
        if (!isBlank(d_personalEmail)) {
          if (!validateEmail(d_personalEmail)) {
            record.addError('d_personalEmail', invalidEmail);
          }
        }
      

        // Convert and validate donation date
        if (!isBlank(donationDate)) {
          const convertedDonationDate = convertDateToISO(donationDate);
          if (convertedDonationDate) {
            record.set('donationDate', convertedDonationDate); // Set the converted date back to the record
          } else if (!isValidDate(donationDate)) {
            record.addError('donationDate', invalidDateFormat);
          }
        }

          // Validate tribute type and tribute name
          if (!isBlank(tributeType) && isBlank(tributeName)) {
            record.addError('tributeName', 'If tribute type is provided, tribute name must also be provided.');
          }
          if (isBlank(tributeType) && !isBlank(tributeName)) {
            record.addError('tributeType', 'If tribute name is provided, tribute type must also be provided.');
          }
  
           // Validate donation amount
        const cleanedDonationAmount = donationAmount.replace(/[$,]/g, ''); 
        let parsedDonationAmount = parseFloat(cleanedDonationAmount);

        if (!/^-?\d+(\.\d+)?$/.test(cleanedDonationAmount)) {
          record.addError('donationAmount', 'Donation amount must be a valid number.');
        } else if (parsedDonationAmount < 0) {
          record.addError('donationAmount', 'Negative donation amounts are not allowed.');
        } else if (parsedDonationAmount === 0) {
          record.set('paymentMethod', 'in_kind');
        }

        // Payment Method Validation
        if (parsedDonationAmount !== 0) {
          if (isBlank(paymentMethod)) {
            record.set('paymentMethod', 'other');
          } else if (!validPaymentMethods.includes(paymentMethod)) {
            paymentDescription = paymentDescription
              ? `${paymentDescription}, ${paymentMethod}`
              : paymentMethod;
            record.set('paymentMethod', 'other');
            record.set('paymentDescription', paymentDescription);
          }
      }

      // Validate warning fields
      if (isBlank(d_personalEmail) && isBlank(indexternalId)) {
          
        record.addError('ind_warning', 'No identifier, which may cause duplicates.');
       
      }

        return record; 
      });
    })
  );

  
  

  let emailToOrgMap = new Map();

  
  listener.use(
    bulkRecordHook("donationsOrgLinked", (records: FlatfileRecord[]) => {
      records.map((record) => {
        const orgName = `${record.get('d_organizationName')}`.trim();
        const orgEmail = `${record.get('d_organization_Email')}`.trim();
        const orgexternalId = `${record.get('orgexternalId')}`.trim();
        const org_warning = `${record.get('org_warning')}`.trim();


        let donationDate = `${record.get('donationDate')}`.trim();
        const tributeType = `${record.get('tributeType')}`.trim();
        const tributeName = `${record.get('tributeName')}`.trim();
        const donationAmount = `${record.get('donationAmount')}`.trim();
        let paymentMethod = `${record.get('paymentMethod')}`.trim().toLowerCase(); // Normalize to lowercase
        let paymentDescription = record.get('paymentDescription') ? `${record.get('paymentDescription')}`.trim() : '';


    //Organization

        // Validate org name field
        if (isBlank(orgName)) {
          record.addError('d_organizationName', noName);
        }

        // Check if the email is already used by a different organization, before email validation

        if (!isBlank(orgEmail)) {
          if (emailToOrgMap.has(orgEmail)) {
            const existingOrgName = emailToOrgMap.get(orgEmail);
            
            // If the email is associated with a different organization, show a warning
            if (existingOrgName !== orgName) {
              record.addError('d_organization_Email', `This email is already associated with another organization`);
            }
          }
          
          // Add or update the email and organization name in the map
          emailToOrgMap.set(orgEmail, orgName);
        }
        

        // Now validate the format of the email
        if(!isBlank(orgEmail)){
        if (!validateEmail(orgEmail)) {
          record.addError('d_organization_Email', invalidEmail);
        }
      }



        // Convert and validate donation date
        if (!isBlank(donationDate)) {
          const convertedDonationDate = convertDateToISO(donationDate);
          if (convertedDonationDate) {
            record.set('donationDate', convertedDonationDate); // Set the converted date back to the record
          } else if (!isValidDate(donationDate)) {
            record.addError('donationDate', invalidDateFormat);
          }
        }

          // Validate tribute type and tribute name
          if (!isBlank(tributeType) && isBlank(tributeName)) {
            record.addError('tributeName', 'If tribute type is provided, tribute name must also be provided.');
          }
          if (isBlank(tributeType) && !isBlank(tributeName)) {
            record.addError('tributeType', 'If tribute name is provided, tribute type must also be provided.');
          }
  
           // Validate donation amount
        const cleanedDonationAmount = donationAmount.replace(/[$,]/g, ''); 
        let parsedDonationAmount = parseFloat(cleanedDonationAmount);

        if (!/^-?\d+(\.\d+)?$/.test(cleanedDonationAmount)) {
          record.addError('donationAmount', 'Donation amount must be a valid number.');
        } else if (parsedDonationAmount < 0) {
          record.addError('donationAmount', 'Negative donation amounts are not allowed.');
        } else if (parsedDonationAmount === 0) {
          record.set('paymentMethod', 'in_kind');
        }

        // Payment Method Validation
        if (parsedDonationAmount !== 0) {
          if (isBlank(paymentMethod)) {
            record.set('paymentMethod', 'other');
          } else if (!validPaymentMethods.includes(paymentMethod)) {
            paymentDescription = paymentDescription
              ? `${paymentDescription}, ${paymentMethod}`
              : paymentMethod;
            record.set('paymentMethod', 'other');
            record.set('paymentDescription', paymentDescription);
          }
          }

          // Validate warning fields
      if (isBlank(orgEmail) && isBlank(orgexternalId)) {
          
        record.addError('org_warning', 'No identifier, which may cause duplicates.');
       
      }
  
        return record; 
      });
    })
  );




  listener.use(exportWorkbookPlugin());
  listener.use(
    exportWorkbookPlugin({
      jobName: "workbook:downloadInvalid",
      recordFilter: "error", // Download only invalid records
    })
  );
  listener.use(autocast("contactIndSheet"));
  listener.use(autocast("contactOrgSheet"));
  listener.use(autocast("donationIndSheet"));
  listener.use(autocast("donationOrgSheet"));
 
}
