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
            description: 'The Gift Date of this donation from Donor Perfect.',
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
            description: 'The Gift Type Description of this donation from Donor Perfect. Acceptable values: ACH, Cash, Check, Credit Card, Direct, In-Kind, GiveCard, Gift Card, Invoice,' +
                'Match, Payroll, Paypal, Venmo, Zelle, Cash App, Square, Other.   If Payment Method is blank, then Other will be the default value. ',
            constraints: [{
                type: "required"
            }]

        },

        {
            key: "GiftId",
            type: "string",
            label: 'GIFT_ID',
        },
            

        {
            key: "paymentDescription",
            type: "string",
            label: 'payment Description',
        },
       
        {
            key: "Description",
            type: "string",
            label: 'Description',
            description: 'The Gift Narrative of this donation from Donor Perfect.',
        },
        
        {
            key: "campaign",
            type: "string",
            label: 'Campaign',
            description: 'The Campaign description of this donation from Donor Perfect.',
        },
        {
            key: "designation",
            type: "string",
            label: 'Designation',
            description: 'The Designation description of this donation from Donor Perfect.',
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
            description: 'The FMV of this donation from Donor Perfect.',
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
            label: 'DONOR_ID',
            description: 'The Donor ID of this contact from your Donor Perfect.',
            constraints: [{
                type: "required"
            }]
        },
            
    
        {
            key: "d_organizationName",
            type: "string",
            label: "Organization Name",
            description: 'The combination of "prefix, first name, middle name, last name and suffix" from Donor Pefect.',
            constraints: [{
                type: "required"
            }]
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
            key: "org_warning",
            type: "string",
            label: "Warning"
    
        },


        {
            key: "Aonogift",
            type: "string",
            label: 'ANONGIFT',
        },

        {
            key: "GLINK",
            type: "string",
            label: 'GLINK',
        },

        {
            key: "PLEDGE_PAYMENT",
            type: "string",
            label: 'PLEDGE_PAYMENT',
        },

        {
            key: "PLINK",
            type: "string",
            label: 'PLINK',
        },

        {
            key: "RECORD_TYPE_DESCR",
            type: "string",
            label: 'RECORD_TYPE_DESCR',
        },

        {
            key: "REFERENCE_NUMBER",
            type: "string",
            label: 'REFERENCE_NUMBER',
        },

        {
            key: "SOLICIT_CODE_DESCR",
            type: "string",
            label: 'SOLICIT_CODE_DESCR',
        },

        {
            key: "GL_CODE_DESCR",
            type: "string",
            label: 'GL_CODE_DESCR',
        },

        {
            key: "SUB_SOLICIT_CODE_DESCR",
            type: "string",
            label: 'SUB_SOLICIT_CODE_DESCR',
        },

        {
            key: "TY_DATE",
            type: "string",
            label: 'TY_DATE',
        },
        {
            key: "CHECK_DT",
            type: "string",
            label: 'CHECK_DT',
        }


        
        ]
  };