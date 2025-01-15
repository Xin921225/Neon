import { Flatfile } from "@flatfile/api";

export const contactOrgSheet: Flatfile.SheetConfig = {
  name: "Contact Org - Linked",
  slug: "contactsOrgLinked",
  allowAdditionalFields: true,
  fields: [


    {
        key: "OrganizationExternalId",
        type: "string",
        label: 'DONOR_ID',
        description: 'The Donor ID of this contact from Donor Perfect.',
        constraints: [{
            type: "required"
        }]
    },

    {
        key: "organizationName",
        type: "string",
        label: "Organization Name",
        description: 'The combination of "prefix, first name, middle name, last name and suffix" from Donor Perfect.',
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
        description: 'Use Business Phone as Organization phone, Only numbers, ")", "(", and "-" allowed.',
    },
        
    {
        key: "organization_note",
        type: "string",
        label: 'Organization User Notes',
        description: 'The Narrative of this contact from Donor Perfect.',
    },

    {
        key: "organization_website",
        type: "string",
        label: 'Organization Website'
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
        key: "orgwarning",
        type: "string",
        label: "Warning"

    }
]
};