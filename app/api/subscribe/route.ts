import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_DOMAIN = '3d9909-43.myshopify.com';
const SHOPIFY_ADMIN_API = `https://${SHOPIFY_DOMAIN}/admin/api/2024-04/graphql.json`;

async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
    const timeout = 15000; // 15 seconds timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error: unknown) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === retries - 1) {
                throw new Error(`Failed to fetch after ${retries} attempts: ${error instanceof Error ? error.message : String(error)}`);
            }
            clearTimeout(timeoutId);
            const backoffMs = Math.min(1000 * Math.pow(2, i) + Math.random() * 1000, 10000);
            console.log(`Retrying in ${backoffMs}ms...`);
            await new Promise(res => setTimeout(res, backoffMs));
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        // Validate environment variable
        if (!process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
            console.error('Missing SHOPIFY_ADMIN_ACCESS_TOKEN environment variable');
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const { email } = await req.json();

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json(
                { message: 'Valid email is required' },
                { status: 400 }
            );
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

        const lookupResponse = await fetchWithRetry(SHOPIFY_ADMIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
            },
            body: JSON.stringify({
                query: lookupQuery,
                variables: {
                    query: `email:${email}`,
                },
            }),
        }) as Response;

        const lookupResult = await lookupResponse.json();

        // Check for GraphQL errors
        if (lookupResult.errors) {
            console.error('GraphQL lookup errors:', lookupResult.errors);
            throw new Error(lookupResult.errors.map((err: any) => err.message).join(', '));
        }

        const existingCustomer = lookupResult.data?.customers?.edges?.[0]?.node;

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

        const createResponse = await fetchWithRetry(SHOPIFY_ADMIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
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
        }) as Response;

        const createResult = await createResponse.json();

        // Check for GraphQL errors
        if (createResult.errors) {
            console.error('GraphQL create errors:', createResult.errors);
            throw new Error(createResult.errors.map((err: any) => err.message).join(', '));
        }

        const createErrors = createResult.data?.customerCreate?.userErrors;
        if (createErrors?.length > 0) {
            return NextResponse.json({ message: createErrors[0].message }, { status: 400 });
        }

        return NextResponse.json({ message: 'Successfully subscribed!' });

    } catch (error: any) {
        console.error('Subscribe API error:', error);
        return NextResponse.json(
            { message: error.message || 'Internal error' },
            { status: 500 }
        );
    }
}