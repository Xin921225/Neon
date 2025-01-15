import { Flatfile } from "@flatfile/api";

export const contactOrgSheet: Flatfile.SheetConfig = {
  name: "Contact Org - Linked",
  slug: "contactsOrgLinked",
  allowAdditionalFields: true,
  fields: [
    {
        key: "OrganizationExternalId",
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
        key: "organizationName",
        type: "string",
        label: "Organization Name",
        description: 'When Account Type= Organization, Company Name is used for Organization Name.',
        constraints: [{
            type: "required"
        }]
    },
    
    {
        key: "organization_Email",
        type: "string",
        label: 'Organization Email',
        description: 'All emails are regarded as organization email, Must contain @ and . in the correct places. No space allowed.',
        constraints: [
            {
                type: "unique"
            }],
    },
    
    {
        key: "organization_addressLine1",
        type: "string",
        label: 'Organization Address',
        description: 'All address are regarded as organization address',
    },
    {
        key: "organization_addressLine2",
        type: "string",
        label: 'Organization Address 2',
    },
    {
        key: "organization_addressCity",
        type: "string",
        label: 'Organization City',
    },
    {
        key: "organization_addressStateProvince",
        type: "string",
        label: 'Organization State',
    },

    {
        key: "organization_addresspostalcode",
        type: "string",
        label: 'Organization Zip Code'
    },  

    {
        key: "organization_addressCountry",
        type: "string",
        label: 'Organization Country',
        description: 'Should be 2 character country code or country name spelled out.',
    },
    {
        key: "organization_Phone",
        type: "string",
        label: 'Organization Phone',
        description: 'Only numbers, ")", "(", and "-" allowed.',
    },

    {
        key: "email opt out",
        type: "string",
        label: 'Email Opt Out',
    },
        
    {
        key: "organization_note",
        type: "string",
        label: 'Organization User Notes',
        description: 'The Narrative of this contact from Neon.',
    },

    
    {
        key: "org_mobilePhone",
        type: "string",
        label: 'Org Mobile',
        description: `Use mobile phone, Only numbers, ")", "(", and "-" allowed.`,
    },
    {
        key: "org_homePhone",
        type: "string",
        label: 'Org Home',
        description: `Use home phone, Only numbers, ")", "(", and "-" allowed.`,
     },
    
     

    {
        key: "orgwarning",
        type: "string",
        label: "Warning"

    }
]
};