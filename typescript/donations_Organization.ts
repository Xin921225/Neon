import { Flatfile } from "@flatfile/api";

export const donationOrgSheet: Flatfile.SheetConfig = {
    name: "Donation Org - Linked",
    slug: "donationsOrgLinked",


    allowAdditionalFields: true,
    fields: [
        {
            key: "donationDate",
            type: "date",
            label: 'Donation Date',
            description: 'The Gift Date of this donation from Neon.',
            constraints: [{
                type: "required"
            }]
        },
        {
            key: "donationAmount",
            type: "number",
            label: 'Amount',
            description: 'The amount of this donation.',
            constraints: [{
                type: "required"
            }]
        },
        
        {
            key: "paymentMethod",
            type: "string",
            label: 'Payment Method',
            description: 'It is the "Tender Type" from Neon. Acceptable values: ACH, Cash, Check, Credit Card, Direct, In-Kind, GiveCard, Gift Card, Invoice,' +
                'Match, Payroll, Paypal, Venmo, Zelle, Cash App, Square, Other.   If Payment Method is blank, then Other will be the default value. ',
            constraints: [{
                type: "required"
            }]

        },


        {
            key: "paymentDescription",
            type: "string",
            label: 'payment Description',
        },
       
        {
            key: "campaign",
            type: "string",
            label: 'Campaign',
            description: 'The Campaign description of this donation from Deon.',
        },
        {
            key: "designation",
            type: "string",
            label: 'Designation',
            description: 'The Designation description of this donation from Neon.',
        },

        {
            key: "Description",
            type: "string",
            label: 'Description',
            description: 'The Gift Narrative of this donation from Neon.',
        },
        
        
        {
            key: "acknowledged",
            type: "boolean",
            label: 'Acknowledged',
        },
        {
            key: "fairMarketValue",
            type: "number",
            label: 'Fair Market Value',
            description: 'The FMV of this donation from Neon.',
        },
        {
            key: "tributeType",
            type: "enum",
            label: 'Tribute Type',
			 config: {
                options: [
                    {
                        value: "honor",
                        label: "Honor"
                    },
					{
                        value: "memorial",
                        label: "Memorial"
                    },
					{
                        value: "on_behalf_of",
                        label: "On Behalf Of"
                    },
					{
                        value: "notSpecified",
                        label: "Not Specified"
                    }
                ]
				}
        },
        {
            key: "tributeName",
            type: "string",
            label: 'Tribute Name',
        },


        {
            key: "orgexternalId",
            type: "string",
            label: 'Account ID',
            description: 'The Account ID of this contact from your Neon.',
            constraints: [{
                type: "required"
            }]
        },
            
    
        {
            key: "d_organizationName",
            type: "string",
            label: "Organization Name",
            constraints: [{
                type: "required"
            }]
        },


        
        {
            key: "org_warning",
            type: "string",
            label: "Warning"
    
        },
        {
            key: "Purpose",
            type: "string",
            label: 'Purpose',
        },

        {
            key: "fund",
            type: "string",
            label: 'Fund',
        },
    ]
  };