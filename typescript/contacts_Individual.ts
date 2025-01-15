import { Flatfile } from "@flatfile/api";

export const contactIndSheet: Flatfile.SheetConfig = {
  name: "Contact Ind - Linked",
  slug: "contactsIndLinked",
  allowAdditionalFields: true,
  fields: [
    
    {
        key: "externalId",
        type: "string",
        label: 'Account ID',
        description: 'The Account ID of this contact from Neon.',
        constraints: [{
            type: "required"
        }]
    },

    {
        key: "accounttype",
        type: "string",
        label: 'Account Type',
        description: 'Account Type = Individual / Organization.',
    },


    {
        key: "fullName",
        type: "string",
        label: 'Full Name',
    },      
    
    {
        key: "firstName",
        type: "string",
        label: 'First Name',
    },
    {
        key: "middleName",
        type: "string",
        label: 'Middle Name',
    },
    {
        key: "lastName",
        type: "string",
        label: 'Last Name',
    },
    {
        key: "prefix",
        type: "string",
        label: 'Prefix',
        description: 'The title of this contact from Neon.',
    },
    {
        key: "nameSuffix",
        type: "string",
        label: 'Suffix',
        description: 'Examples: Jr., Sr., Esq., etc.',
    },

    {
        key: "house hold Name",
        type: "string",
        label: 'Household Name',
        
    },

   
    {
        key: "personalEmail",
        type: "string",
        label: 'Personal Email',
        description: 'Must contain @ and . in the correct places. No space allowed.',
        constraints: [
            {
                type: "unique"
            }],
    },
    {
        key: "workEmail",
        type: "string",
        label: 'Work Email',
        description: 'Must contain @ and . in the correct places. No space allowed.',
    },
    {
        key: "secondaryEmail",
        type: "string",
        label: 'Secondary Email',
        description: 'Must contain @ and . in the correct places. No space allowed.'
    },
   
    {
        key: "mobilePhone",
        type: "string",
        label: 'Mobile Phone',
        description: `Only numbers, ")", "(", and "-" allowed.`,
    },
    {
        key: "homePhone",
        type: "string",
        label: 'Home Phone',
        description: `Only numbers, ")", "(", and "-" allowed.`,
     },
   
    {
        key: "workPhone",
        type: "string",
        label: 'Work Phone',
        description: 'Only numbers, ")", "(", and "-" allowed.',
    },


    {
        key: "addressLine1",
        type: "string",
        label: 'Address',
    },
    {
        key: "addressLine2",
        type: "string",
        label: 'Address 2',
    },
    {
        key: "addressCity",
        type: "string",
        label: 'City',
    },
    {
        key: "addressStateProvince",
        type: "string",
        label: 'State',
    },

    {
        key: "addressPostalCode",
        type: "string",
        label: 'Zip Code'
    },

    {
        key: "addressCountry",
        type: "string",
        label: 'Country',
        description: 'Should be 2 character country code or country name spelled out.',
    },
    
    {
        key: "workAddressLine1",
        type: "string",
        label: 'Work Address',
  
    },
    {
        key: "workAddressLine2",
        type: "string",
        label: 'Work Address 2',
    },
    {
        key: "workAddressCity",
        type: "string",
        label: 'Work City',
    },
    {
        key: "workAddressStateProvince",
        type: "string",
        label: 'Work State',
    },
    {
        key: "workAddressPostalCode",
        type: "string",
        label: 'Work Zip Code'
    },
    {
        key: "workAddressCountry",
        type: "string",
        label: 'Work Country',
        description: 'Should be 2 character country code or country name spelled out.',
    },
  

    {
        key: "companyName",
        type: "string",
        label: 'Employer',
        description: 'When Account Type = Individual, Use Company Name as Employer.',

    },

    {
        key: "email opt out",
        type: "string",
        label: 'Email Opt Out',
    },

    {
        key: "jobTitle",
        type: "string",
        label: 'Job Title',
        description: 'The prof title of this contact from Neon.',
    },
    {
        key: "informalGreeting",
        type: "string",
        label: 'Informal Greeting',
        description: 'The salutation of this contact from Neon.',
    },

    {
        key: "formalGreeting",
        type: "string",
        label: 'Formal Greeting',
        description: 'The formal salutation of this contact from Neon.',
    },
   
    {
        key: "note",
        type: "string",
        label: 'User Notes',
        description: 'The Narrative of this contact from Neon.',

    },


    {
        key: "warning",
        type: "string",
        label: "Warning"

    }]
};