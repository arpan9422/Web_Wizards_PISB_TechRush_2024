const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { loginRouterSchema } = require('./zod.js'); // Import the Zod schemas
const { User } = require("./mongusSchema.js");
dotenv.config(); // Initialize environment variables

const saltRounds = 10;
const SECRET = process.env.SECRETS;

const loginRouter = express.Router();

const TOKEN_VALID_MINS = 15;

// Connect to MongoDB


// login function (code 400 : bad request, 410: user not found, 411: wrong password)
async function login(req, res) {
    const { email, password } = req.body;
    try {
	loginRouterSchema.parse({ email, password });
    } catch (e) {
	return res.status(400).json({ Api_Response: 400, message: e.errors });
    }

    try {

	// see if user exists
	const user = await User.findOne({ email: email });

	// check password
	const validPassword = bcrypt.compareSync(password, user.password);
	if (!validPassword) {
	    return res.status(411).send('{ "error":"Invalid password" }');
	}

	// Generate JWT
	const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: TOKEN_VALID_MINS * 60 });

	// return successful reponse
	res.cookie('auth_tok', token);
	return res.status(200).json({ user_id: user._id, token: token });
	
    } catch (error) {
	console.log('Error in login:', error);
	return res.status(410).json({ Api_Response: 304, message: 'Error user not found' });
    }
}

loginRouter.post('/Login', login);

module.exports = loginRouter;