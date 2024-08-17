import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

export async function sendEmail(
    email: string,
    subject: string,
    html: any
) {
    if (!process.env.EMAIL_FROM) {
        throw new Error("EMAIL_FROM is not defined")
    }
    console.log(process.env.EMAIL_FROM, process.env.EMAIL_PASSWORD);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            // user: process.env.EMAIL_FROM,
            // pass: process.env.EMAIL_PASSWORD,
            user: "mihirraj444@gmail.com",
            pass: "kgwq gogg mzvv azch",
        },
    });

    const emailHtml = render(html);

    try {
        const options = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: subject,
            html: emailHtml,
        };
        await transporter.sendMail(options as any);
    } catch (error) {
        console.error("Error sending email", error)
    }
}