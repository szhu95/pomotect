import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

function capitalizeWords(str: string) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export async function sendConfirmationEmail(name: string, email: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Postmodern Tectonics <office@pomotect.com>',
            to: email,
            subject: 'RSVP Confirmation - Postmodern Tectonics & Casa Ysasi: Musical Furniture',
            html: `
                <div style="font-family: 'Courier New', Courier, 'Lucida Console', Monaco, monospace; max-width: 600px; margin: 0 auto; letter-spacing: 0.5px;">
                    <h2 style="font-weight: bold; font-size: 24px; font-family: 'Courier New', Courier, monospace;">Thank you for your RSVP, ${capitalizeWords(name)}!</h2>
                    <p style="font-size: 16px; line-height: 1.5;">We've received your RSVP and look forward to having you join us Saturday, June 21st.</p>
                    <p style="font-size: 16px; line-height: 1.5;">Your registration details:</p>
                    <ul style="font-size: 16px; line-height: 1.5;">
                        <li>Name: ${capitalizeWords(name)}</li>
                        <li>Email: ${email}</li>
                    </ul>
                    <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                        If you have any questions or need to update your RSVP, please reply to this email or contact us at 
                        <a href="mailto:office@pomotect.com" style="color: #2D2DEF; text-decoration: none; font-family: 'Courier New', Courier, monospace;">office@pomotect.com</a>.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend API error:', error);
            throw new Error(error.message);
        }

        console.log('Email sent successfully:', data);

        return { success: true, data };
    } catch (error: any) {
        console.error('Error sending confirmation email:', error);
        return { success: false, error: error.message };
    }
} 