import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

export async function sendEmail(
    email: string,
    subject: string,
    html: any
) {
    if (!process.env.NEXT_PUBLIC_EMAIL_FROM) {
        throw new Error("EMAIL_FROM is not defined")
    }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_FROM,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        },
    });

    const emailHtml = render(html);

    try {
        const options = {
            from: process.env.NEXT_PUBLIC_EMAIL_FROM,
            to: email,
            subject: subject,
            html: emailHtml,
        };
        await transporter.sendMail(options as any);
    } catch (error) {
        console.error("Error sending email", error)
    }
}