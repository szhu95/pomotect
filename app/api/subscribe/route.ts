import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_DOMAIN = '3d9909-43.myshopify.com';
const SHOPIFY_ADMIN_API = `https://${SHOPIFY_DOMAIN}/admin/api/2024-04/graphql.json`;

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        //console.log("Received email:", email);

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Step 1: Check if customer already exists
        const lookupQuery = `
      query getCustomer($query: String!) {
        customers(first: 1, query: $query) {
          edges {
            node {
              id
              email
              emailMarketingConsent {
                marketingState
              }
            }
          }
        }
      }
    `;

        const lookupResponse = await fetch(SHOPIFY_ADMIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
            },
            body: JSON.stringify({
                query: lookupQuery,
                variables: {
                    query: `email:${email}`,
                },
            }),
        });

        const lookupResult = await lookupResponse.json();
        //console.log("lookup result is", JSON.stringify(lookupResult));

        const existingCustomer = lookupResult.data?.customers?.edges?.[0]?.node;

        //console.log("exisitingCustomer is ", existingCustomer)

        // Step 2: If exists and already subscribed
        if (existingCustomer) {
            return NextResponse.json(
                { message: 'You are already subscribed.' },
                { status: 200 }
            );
        }

        // Step 3: Create new customer with marketing consent
        const createQuery = `
      mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

        const createResponse = await fetch(SHOPIFY_ADMIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
            },
            body: JSON.stringify({
                query: createQuery,
                variables: {
                    input: {
                        email,
                        emailMarketingConsent: {
                            marketingState: 'SUBSCRIBED',
                            marketingOptInLevel: 'SINGLE_OPT_IN'
                        },
                        tags: ['newsletter'],
                    },
                },
            }),
        });

        const createResult = await createResponse.json();
        //console.log("create result is", JSON.stringify(createResult));

        const createErrors = createResult.data?.customerCreate?.userErrors;
        if (createErrors?.length > 0) {
            return NextResponse.json({ message: createErrors[0].message }, { status: 400 });
        }

        return NextResponse.json({ message: 'Successfully subscribed!' });

    } catch (error: any) {
        console.error('GraphQL API error:', error);
        return NextResponse.json({ message: error.message || 'Internal error' }, { status: 500 });
    }
}