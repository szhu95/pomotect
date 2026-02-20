import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactBody = {
    name?: unknown;
    email?: unknown;
    subject?: unknown;
    message?: unknown;
    type?: unknown;
    productTitle?: unknown;
    // anti-spam
    company?: unknown; // honeypot
    startedAt?: unknown; // ms timestamp from client
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string | null {
    if (typeof value !== 'string') return null;
    const v = value.trim();
    return v.length ? v : null;
}

function isLikelyGibberishName(name: string): boolean {
    // Mild heuristic: long single-token strings with no spaces and high character variety
    // (matches patterns like "LjsWNyGVayMeyvRDtaMv" without blocking typical names).
    const trimmed = name.trim();
    if (trimmed.length < 14) return false;
    if (/\s/.test(trimmed)) return false;
    const unique = new Set(trimmed.toLowerCase()).size;
    const ratio = unique / trimmed.length;
    return ratio > 0.6;
}

export async function POST(request: Request) {
    try {
        // Validate environment variable
        if (!process.env.RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const body = (await request.json()) as ContactBody;
        const type = typeof body.type === 'string' ? body.type : undefined;
        const productTitle = asTrimmedString(body.productTitle);

        // Honeypot: if present/non-empty, pretend success (drop silently).
        const company = asTrimmedString(body.company);
        if (company) {
            return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
        }

        // Timing check: bots submit instantly; humans typically take longer.
        const startedAt = typeof body.startedAt === 'number' ? body.startedAt : undefined;
        if (startedAt && Number.isFinite(startedAt)) {
            const elapsedMs = Date.now() - startedAt;
            if (elapsedMs >= 0 && elapsedMs < 1750) {
                return NextResponse.json(
                    { error: 'Please take a moment before submitting.' },
                    { status: 400 }
                );
            }
        }

        const email = asTrimmedString(body.email);
        const message = asTrimmedString(body.message);
        const subject = asTrimmedString(body.subject);
        const name = asTrimmedString(body.name);

        // Validate required fields
        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }
        if (message.length < 10 || message.length > 5000) {
            return NextResponse.json(
                { error: 'Message must be between 10 and 5000 characters' },
                { status: 400 }
            );
        }

        // Use verified domain sender format for Resend
        const senderEmail = 'Postmodern Tectonics <office@pomotect.com>';

        if (type === 'inquiry') {
            // Handle inquiry form
            if (!productTitle && !subject) {
                return NextResponse.json(
                    { error: 'Product title or subject is required for inquiries' },
                    { status: 400 }
                );
            }
            if (subject && (subject.length < 3 || subject.length > 140)) {
                return NextResponse.json(
                    { error: 'Subject must be between 3 and 140 characters' },
                    { status: 400 }
                );
            }

            const { data, error } = await resend.emails.send({
                from: senderEmail,
                to: ['office@pomotect.com'],
                replyTo: email,
                subject: `Inquiry: ${productTitle || subject}`,
                html: `
                    <h2>New Product Inquiry: ${productTitle || subject}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Product:</strong> ${productTitle || 'N/A'}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            });

            if (error) {
                console.error('Resend API error (inquiry):', error);
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            return NextResponse.json({ message: 'Inquiry sent successfully', data });
        } else {
            // Handle general contact form
            if (!name) {
                return NextResponse.json(
                    { error: 'Name is required' },
                    { status: 400 }
                );
            }
            if (name.length < 2 || name.length > 80) {
                return NextResponse.json(
                    { error: 'Name must be between 2 and 80 characters' },
                    { status: 400 }
                );
            }
            if (!/^[a-zA-ZÀ-ÿ' -]+$/.test(name)) {
                return NextResponse.json(
                    { error: 'Name contains invalid characters' },
                    { status: 400 }
                );
            }
            if (isLikelyGibberishName(name)) {
                return NextResponse.json(
                    { error: 'Please enter a valid name' },
                    { status: 400 }
                );
            }

            if (!subject) {
                return NextResponse.json(
                    { error: 'Subject is required' },
                    { status: 400 }
                );
            }
            if (subject.length < 3 || subject.length > 140) {
                return NextResponse.json(
                    { error: 'Subject must be between 3 and 140 characters' },
                    { status: 400 }
                );
            }

            const { data, error } = await resend.emails.send({
                from: senderEmail,
                to: ['office@pomotect.com'],
                replyTo: email,
                subject: `Contact Form: ${subject}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            });

            if (error) {
                console.error('Resend API error (contact):', error);
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            return NextResponse.json({ message: 'Email sent successfully', data });
        }
    } catch (error: any) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: error.message || 'Error sending email' },
            { status: 500 }
        );
    }
} 