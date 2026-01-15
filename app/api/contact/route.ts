import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

        const body = await request.json();
        const { name, email, subject, message, type, productTitle } = body;

        // Validate required fields
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return NextResponse.json(
                { error: 'Message is required' },
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
            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                return NextResponse.json(
                    { error: 'Name is required' },
                    { status: 400 }
                );
            }

            if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
                return NextResponse.json(
                    { error: 'Subject is required' },
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