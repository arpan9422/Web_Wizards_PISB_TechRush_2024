const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendMail = async (from, to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    console.log(`Sending mail to - ${to}`);
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email: ', error);
    }
};

const sendReminder = async (email, message) => {
    const from = process.env.MAIL_USERNAME;
    const to = email;
    const subject = "Daily Reminder";
    const html = message;

    await sendMail(from, to, subject, html);
    console.log('Reminder sent successfully');
};

module.exports = sendReminder;
