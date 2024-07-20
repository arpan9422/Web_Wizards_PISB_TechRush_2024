const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { signupSchema } = require('./zod.js'); // Import the Zod schemas
const { User } = require("./mongusSchema.js");
dotenv.config(); // Initialize environment variables

const saltRounds = 10;
const SECRET = process.env.SECRETS;
const TOKEN_VALID_MINS = process.env.TOKEN_VALIDITY_MINS;


const signupRouter = express.Router();

// Connect to MongoDB


// Signup function
async function signup(req, res) {
    const { email, password } = req.body;
    try {
	signupSchema.parse({ email, password });
    } catch (e) {
	return res.status(400).json({ status:"error", Api_Response: 400, message: e.errors });
    }

    try {

	const user = await User.findOne({ email: email });
	if (user) {
	    return res.json({ status:"error", Api_Response: 302, message: 'Email already exists' });
	}

	// Hash the password
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	// Create the new user
	const newUser = new User({
	    email: email,
	    password: hashedPassword,
	});
	
	const userCreated = await newUser.save();

	// Generate JWT
	const token = jwt.sign({ id: userCreated._id }, SECRET, { expiresIn: TOKEN_VALID_MINS * 60 });

	return res.json({ status:"success", user_id: userCreated._id, token: token });
    } catch (error) {
	console.log('Error in signup:', error);
	return res.json({ status:"error", Api_Response: 304, message: 'Error in signup backend' });
    }
}

signupRouter.post('/signup', signup);

module.exports = signupRouter;
