import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail } from '@/lib/email';

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

        const { name, email } = await req.json();

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { message: 'Name is required' },
                { status: 400 }
            );
        }

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
                            tags
                        }
                    }
                }
            }
        `;

        const lookupResponse = await fetchWithRetry(SHOPIFY_ADMIN_API, {
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
        }) as Response;

        const lookupResult = await lookupResponse.json();
        const existingCustomer = lookupResult.data?.customers?.edges?.[0]?.node;

        // Check if customer has already RSVP'd
        if (existingCustomer && existingCustomer.tags.includes('rsvp')) {
            return NextResponse.json(
                { message: 'You have already RSVP\'d' },
                { status: 400 }
            );
        }

        if (existingCustomer) {
            // Update existing customer with RSVP tag
            const updateQuery = `
                mutation customerUpdate($input: CustomerInput!) {
                    customerUpdate(input: $input) {
                        customer {
                            id
                            email
                            tags
                        }
                        userErrors {
                            field
                            message
                        }
                    }
                }
            `;

            const updateResponse = await fetchWithRetry(SHOPIFY_ADMIN_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
                },
                body: JSON.stringify({
                    query: updateQuery,
                    variables: {
                        input: {
                            id: existingCustomer.id,
                            tags: [...existingCustomer.tags, 'rsvp'],
                        },
                    },
                }),
            }) as Response;

            const updateResult = await updateResponse.json();
            if (updateResult.data?.customerUpdate?.userErrors?.length > 0) {
                throw new Error(updateResult.data.customerUpdate.userErrors[0].message);
            }
        } else {
            // Create new customer with RSVP tag
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
                    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
                },
                body: JSON.stringify({
                    query: createQuery,
                    variables: {
                        input: {
                            email,
                            firstName: name.split(' ')[0],
                            lastName: name.split(' ').slice(1).join(' '),
                            tags: ['rsvp'],
                            emailMarketingConsent: {
                                marketingState: 'SUBSCRIBED',
                                marketingOptInLevel: 'SINGLE_OPT_IN'
                            }
                        },
                    },
                }),
            }) as Response;

            const createResult = await createResponse.json();
            if (createResult.data?.customerCreate?.userErrors?.length > 0) {
                throw new Error(createResult.data.customerCreate.userErrors[0].message);
            }
        }

        // Send confirmation email
        const emailResult = await sendConfirmationEmail(name, email);
        if (!emailResult.success) {
            console.error('Failed to send confirmation email:', emailResult.error);
        }
        
        return NextResponse.json(
            { 
                message: 'RSVP received successfully! Please check your email for confirmation.',
                emailSent: emailResult.success 
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('RSVP submission error:', error);
        return NextResponse.json(
            { message: error.message || 'Internal error' },
            { status: 500 }
        );
    }
} 