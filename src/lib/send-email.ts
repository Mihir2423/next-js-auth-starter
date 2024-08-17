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
    const emailFrom = process.env.NEXT_PUBLIC_EMAIL_FROM;
    const emailPassword = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: emailFrom,
            pass: emailPassword,
        },
    });

    const emailHtml = render(html);

    try {
        const options = {
            from: emailFrom,
            to: email,
            subject: subject,
            html: emailHtml,
        };
        await transporter.sendMail(options as any);
    } catch (error) {
        console.error("Error sending email", error)
    }
}