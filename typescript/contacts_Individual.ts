import { Flatfile } from "@flatfile/api";

export const contactIndSheet: Flatfile.SheetConfig = {
  name: "Contact Ind - Linked",
  slug: "contactsIndLinked",
  allowAdditionalFields: true,
  fields: [
    
    {
        key: "externalId",
        type: "string",
        label: 'DONOR_ID',
        description: 'The Donor ID of this contact from Donor Perfect.',
        constraints: [{
            type: "required"
        }]
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
        description: 'The title of this contact from Donor Perfect.',
    },
    {
        key: "nameSuffix",
        type: "string",
        label: 'Suffix',
        description: 'Examples: Jr., Sr., Esq., etc.',
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
        description: 'When EMAIL_TYPE_DESCR = work, contain @ and . in the correct places. No space allowed.',
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
        key: "faxPhone",
        type: "string",
        label: 'Fax Phone',
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
        description: 'When ADDRESS_TYPE_DESCR = work/business, contain @ and . in the correct places. No space allowed.',
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
        key: "employerName",
        type: "string",
        label: 'Employer',
    },
    {
        key: "jobTitle",
        type: "string",
        label: 'Job Title',
        description: 'The prof title of this contact from Donor Perfect.',
    },
    {
        key: "informalGreeting",
        type: "string",
        label: 'Informal Greeting',
        description: 'The salutation of this contact from Donor Perfect.',
    },

    {
        key: "formalGreeting",
        type: "string",
        label: 'Formal Greeting',
        description: 'The formal salutation of this contact from Donor Perfect.',
    },
   
   
    
    {
        key: "dateOfBirth",
        type: "date",
        label: 'Date of Birth',
    },
    {
        key: "deceased",
        type: "enum",
            label: 'Deceased',
            description: 'Deceased = no, the contact is not deceased, = yes, is deceased',
			 config: {
                options: [
                    {
                        value: "N",
                        label: "no"
                    },
					{
                        value: "Y",
                        label: "yes"
                    }
					
                ]
				}
        },
    {
        key: "gender",
        type: "string",
        label: 'Gender',
        description: 'M, F, Male, Female, or any text.'
    },
    {
        key: "note",
        type: "string",
        label: 'User Notes',
        description: 'The Narrative of this contact from Donor Perfect.',

    },
    {
        key: "orgrec",
        type: "string",
        label: 'ORG_REC',
        description: 'The value = Y is regared as organization, = N is regared as Individual.',
        constraints: [{
            type: "required"
        }]

    },


    {
        key: "optline",
        type: "string",
        label: 'opt_line'
    },

    {
        key: "donortype",
        type: "string",
        label: 'DONOR_TYPE_DESCR'
    },



    {
        key: "Addresstype",
        type: "string",
        label: 'ADDRESS_TYPE_DESCR'
    },

    {
        key: "Emailtype",
        type: "string",
        label: 'EMAIL_TYPE_DESCR'
    },

    {
        key: "noemail",
        type: "string",
        label: 'No_Email'
    },

    {
        key: "noemailreason",
        type: "string",
        label: 'NO_EMAIL_REASON_DESCR'
    },

    {
        key: "emailstatus",
        type: "string",
        label: 'EMAIL_STATUS_DESCR'
    },


    {
        key: "nomail",
        type: "string",
        label: 'No Mail'
    },

    {
        key: "nomailreason",
        type: "string",
        label: 'NOMAIL_REASON_DESCR'
    },


    {
        key: "mailstatus",
        type: "string",
        label: 'MAIL_STATUS_DESCR'
    },

    {
        key: "nocall",
        type: "string",
        label: 'No Call'
    },

    {
        key: "nocallreason",
        type: "string",
        label: 'CALL_REASON_DESCR'
    },

    {
        key: "call status",
        type: "string",
        label: 'CALL_STATUS_DESCR'
    },

    {
        key: "spouse",
        type: "string",
        label: 'Spouse'
    },

    {
        key: "web",
        type: "string",
        label: 'Website'
    },


    {
        key: "warning",
        type: "string",
        label: "Warning"

    }]
};