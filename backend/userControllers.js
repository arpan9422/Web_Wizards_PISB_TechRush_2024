const nodemailer = require('nodemailer');
const winston = require('winston');
const dotenv = require('dotenv');

dotenv.config();

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

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

    logger.info(`Sending mail to - ${to}`);
    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info('Email sent: ' + info.response);
    } catch (error) {
        logger.error('Error sending email: ', error);
    }
};

const sendReminder = async (email) => {
    const from = process.env.MAIL_USERNAME;
    const to = email;
    const subject = "Daily Reminder";
    const html = "This is your daily reminder. Have a great day!";

    await sendMail(from, to, subject, html);
    logger.info('Reminder sent successfully');
};

module.exports = sendReminder;
