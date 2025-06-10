import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message, type, productTitle } = body;

        if (type === 'inquiry') {
            // Handle inquiry form
            const { data, error } = await resend.emails.send({
                from: `${email}`,
                to: ['office@pomotect.com'],
                replyTo: email,
                subject: `Inquiry: ${productTitle || subject}`,
                html: `
                    <h2>New Product Inquiry: ${productTitle || subject}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Product:</strong> ${productTitle}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            });

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            return NextResponse.json({ message: 'Inquiry sent successfully', data });
        } else {
            // Handle general contact form
            const { data, error } = await resend.emails.send({
                from: `${email}`,
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
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            return NextResponse.json({ message: 'Email sent successfully', data });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
} 