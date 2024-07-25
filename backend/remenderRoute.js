const express = require('express');
const router = express.Router();
const sendReminder = require('./userController.js');
const cron = require('node-cron');
const { User } = require('./mongusSchema.js'); // Assuming you have this model

router.use(express.json());

// Existing route for scheduling individual reminders


router.post('/schedule-reminder', async(req, res) => {
    const { Email, time, status, msg } = req.body;

    if (!Email || !time || !status) {
	return res.status(400).json({ message: 'Email, time, and status are required' });
    }


    if (status !== 'ON' && status !== 'OFF') {
	return res.status(400).json({ message: 'Status must be either ON or OFF' });
    }

    const [hour, minute] = time.split(':');
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
	return res.status(400).json({ message: 'Invalid time format. Use HH:MM in 24-hour format.' });
    }

    const cronTime = `${minute} ${hour} * * *`;



    await User.findOneAndUpdate(
	{ "email": Email },
	{ time, status, msg },
	{ upsert: true, new: true }
    );

    cron.getTasks().forEach(task => {
	if (task.name === Email) {
	    task.stop();
	}
    });

    //await sendReminder(Email, "HI!");
    
    cron.schedule(cronTime,async () => {
	await sendReminder(Email, `Dear User,<br> ${msg} <br> This is your daily reminder to update income, expense on <a href="https://backupwebwizards.onrender.com/">website</a>`);
	
    }, {
	scheduled: true,
	timezone: "Asia/Kolkata"
    });

    console.log(`Reminder Email scheduled at ${time} for ${Email}`);
    res.status(200).json({ message: `Reminder scheduled at ${time} for ${Email}` });
});

// // New route to send reminders to all emails in the DB
// router.post('/send-all-reminders', async (req, res) => {
//     try {
//         const otps = await Otp.find({}, 'Email');
//         const emailPromises = otps.map(otp => sendReminder(otp.Email));
//         await Promise.all(emailPromises);

//         logger.info('Reminders sent to all emails in the DB');
//         res.status(200).json({ message: 'Reminders sent to all emails in the DB' });
//     } catch (error) {
//         logger.error('Error sending reminders to all emails: ', error);
//         res.status(500).json({ message: 'Error sending reminders to all emails' });
//     }
// });

module.exports = router;
