const express = require('express');
const router = express.Router();
const sendReminder = require('./userController');
const Otp = require('./mongusSchema'); // Import the Otp model
const cron = require('node-cron');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

router.use(express.json());

// Existing route for scheduling individual reminders
router.post('/schedule-reminder', (req, res) => {
    const { email, time } = req.body;

    if (!email || !time) {
        return res.status(400).json({ message: 'Email and time are required' });
    }

    const [hour, minute] = time.split(':');
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        return res.status(400).json({ message: 'Invalid time format. Use HH:MM in 24-hour format.' });
    }

    const cronTime = `${minute} ${hour} * * *`;

    cron.schedule(cronTime,async () => {
        await sendReminder(email);
        logger.info(`Reminder email scheduled at ${time} for ${email}`);
    });

    res.status(200).json({ message: `Reminder scheduled at ${time} for ${email}` });
});

// New route to send reminders to all emails in the DB
router.post('/send-all-reminders', async (req, res) => {
    try {
        const otps = await Otp.find({}, 'Email');
        const emailPromises = otps.map(otp => sendReminder(otp.Email));
        await Promise.all(emailPromises);

        logger.info('Reminders sent to all emails in the DB');
        res.status(200).json({ message: 'Reminders sent to all emails in the DB' });
    } catch (error) {
        logger.error('Error sending reminders to all emails: ', error);
        res.status(500).json({ message: 'Error sending reminders to all emails' });
    }
});

module.exports = router;
