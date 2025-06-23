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

        // Send confirmation to attendee
        const attendeeEmail = await resend.emails.send({
            from: 'Postmodern Tectonics <office@pomotect.com>',
            to: email,
            subject: 'RSVP Confirmation - Postmodern Tectonics & Casa Ysasi: Musical Furniture',
            html: `
                <div style="font-family: 'Courier New', Courier, 'Lucida Console', Monaco, monospace; max-width: 600px; margin: 0 auto; letter-spacing: 0.5px;">
                    <h2 style="font-weight: bold; font-size: 24px; font-family: 'Courier New', Courier, monospace;">Thank you for your RSVP, ${capitalizeWords(name)}!</h2>
                    <p style="font-size: 16px; line-height: 1.5;">We've received your RSVP and look forward to having you join us.</p>
                    <p style="font-size: 16px; line-height: 1.5; font-weight: bold;">Event Details:</p>
                    <ul style="font-size: 16px; line-height: 1.5;">
                        <li>Ysasi Gallery</li>
                        <li>Saturday, June 21</li>
                        <li>5 to 9 PM</li>
                        <li>5104 W Adams Blvd, Los Angeles, CA 90016</li>
                    </ul>
                    <p style="font-size: 16px; line-height: 1.5; font-weight: bold;">Your Registration Details:</p>
                    <ul style="font-size: 16px; line-height: 1.5;">
                        <li>Name: ${capitalizeWords(name)}</li>
                        <li>Email: ${email}</li>
                    </ul>
                    <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Postmodern%20Tectonics%20%26%20Casa%20Ysasi%3A%20Musical%20Furniture&dates=20250621T170000/20250621T210000&ctz=America/Los_Angeles&location=5104%20W%20Adams%20Blvd%2C%20Los%20Angeles%2C%20CA%2090016&details=Join%20us%20at%20Casa%20Ysasi%20for%20a%20listening%20session%20%E2%80%94%20an%20afternoon%20and%20evening%20of%20wide-ranging%20vinyl-only%20programming%20%E2%80%94%20to%20celebrate%20the%20release%20of%20Musical%20Furniture%20%5BCase%20Study%2001%5D." 
                           style="color: #2D2DEF; text-decoration: none; font-family: 'Courier New', Courier, monospace; display: inline-block; margin-right: 20px;">
                            📅 Add to Google Calendar
                        </a>
                        <a href="https://pomotect.com/api/calendar" 
                           style="color: #2D2DEF; text-decoration: none; font-family: 'Courier New', Courier, monospace; display: inline-block;">
                            📅 Add to iCal
                        </a>
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                        If you have any questions or need to update your RSVP, please reply to this email or contact us at 
                        <a href="mailto:office@pomotect.com" style="color: #2D2DEF; text-decoration: none; font-family: 'Courier New', Courier, monospace;">office@pomotect.com</a>.
                    </p>
                </div>
            `,
        });

        // Send notification to office
        const officeEmail = await resend.emails.send({
            from: 'Postmodern Tectonics <office@pomotect.com>',
            to: 'office@pomotect.com',
            subject: 'New RSVP Received - Musical Furniture Event',
            html: `
                <div style="font-family: 'Courier New', Courier, 'Lucida Console', Monaco, monospace; max-width: 600px; margin: 0 auto; letter-spacing: 0.5px;">
                    <h2 style="font-weight: bold; font-size: 24px; font-family: 'Courier New', Courier, monospace;">New RSVP Received</h2>
                    <p style="font-size: 16px; line-height: 1.5;">A new RSVP has been received for the Musical Furniture event:</p>
                    <ul style="font-size: 16px; line-height: 1.5;">
                        <li>Name: ${capitalizeWords(name)}</li>
                        <li>Email: ${email}</li>
                    </ul>
                </div>
            `,
        });

        if (attendeeEmail.error || officeEmail.error) {
            console.error('Resend API error:', attendeeEmail.error || officeEmail.error);
            throw new Error((attendeeEmail.error || officeEmail.error)?.message);
        }

        console.log('Emails sent successfully:', { attendee: attendeeEmail.data, office: officeEmail.data });

        return { success: true, data: { attendee: attendeeEmail.data, office: officeEmail.data } };
    } catch (error: any) {
        console.error('Error sending confirmation emails:', error);
        return { success: false, error: error.message };
    }
} 