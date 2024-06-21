import nodemailer from 'nodemailer'
import config from '../config';

const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "mohammademranali15@gmail.com",
            pass: config.app_password
        },
    });

    await transporter.sendMail({
        from: 'mohammademranali15@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password within 10 min", // Subject line
        text: "", // plain text body
        html, // html body
    });

};

export default sendEmail;