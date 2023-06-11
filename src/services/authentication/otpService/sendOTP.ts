import { NextFunction } from 'express';
import nodemailer from 'nodemailer';


export async function sendOTP(to: string, OTP: number, next: NextFunction) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILGUN_USER,
                pass: process.env.MAILGUN_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: to,
            subject: 'Welcome to Study Ease 😀',
            // text: `Here is your One Time Password : ${newUser.OTP}`,
            html: `
            <p>Hi,</p>
    
            <p>Welcome to {Company Name}. Thank you for creating an account in my app. I hope that my app will be beneficial to your studies.</p>
            
            <p>Here is your One-Time-Password:&#160; <b>${OTP}</b></p>
            
            <p>For any doubts or support, please email us at {support@comapny.com}.</p>
                    
            <p>Thank You</p>`
        })
    } catch (err) {
        next(err);
    }
}