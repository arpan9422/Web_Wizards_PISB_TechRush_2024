
const express = require('express');
const querystring = require('querystring');
const { User } = require("./mongusSchema.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const saltRounds = 10;
const SECRET = process.env.SECRETS;
const TOKEN_VALID_MINS =  process.env.TOKEN_VALIDITY_MINS;

const SERVER_ROOT_URI = "https://backupwebwizards.onrender.com";
const redirectURI = "google-oauth";

const GOOGLE_CLIENT_ID = "352698624117-sj4lk878plt78f1gpud67nprcb6m01o4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const googleOAuthRouter = express.Router();

const getGoogleAuthURL = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
	redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
	client_id: GOOGLE_CLIENT_ID,
	access_type: "offline",
	response_type: "code",
	prompt: "consent",
	scope: [
	    "https://www.googleapis.com/auth/userinfo.email",
	].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
}


async function getTokens({
    code,
    clientId,
    clientSecret,
    redirectUri,
}) {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = "https://oauth2.googleapis.com/token";
    const values = {
	code,
	client_id: clientId,
	client_secret: clientSecret,
	redirect_uri: redirectUri,
	grant_type: "authorization_code",
    };

    let result = await fetch(`${url}?${querystring.stringify(values)}`,
		 {
		     method: "POST",
		     headers: {
			 "Content-Type": "application/x-www-form-urlencoded",
		     },
		 })
	.then((res) => res.json())
	.catch((error) => {
	    console.error(`Failed to fetch auth tokens`);
	    throw new Error(error.message);
	    return { "id_token":0, "access_token":0 };
	});

    console.log(JSON.stringify(result));
    return result;
}

async function google_signin(req, res) {
    const code = req.query.code;

    console.log(code);

    const { id_token, access_token } = await getTokens({
	code,
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
    });

    // Fetch the user's profile with the access token and bearer
    const googleUser = await fetch(
	`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
	{
	    method: "GET",
	    headers: {
		Authorization: `Bearer ${id_token}`,
	    },
	})
	  .then((res) => res.json())
	  .catch((error) => {
	      console.error(`Failed to fetch user`);
	      throw new Error(error.message);
	  });

    let email = googleUser["email"];

    try {

	const user = await User.findOne({ email: email });
	//check if user exists already, if so then sign in
	if (user) {
	    const user = await User.findOne({ email: email });

	    // Generate JWT
	    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: TOKEN_VALID_MINS * 60 });

	    // return successful reponse
	    res.cookie('auth_tok', token);
	    return res.redirect('dashboard');
	}

	//If not then create new user
	
	// Hash the password
	const hashedPassword = await bcrypt.hash("-", saltRounds);

	// Create the new user
	const newUser = new User({
	    email: email,
	    password: hashedPassword,
	});
	
	const userCreated = await newUser.save();

	// Generate JWT
	const token = jwt.sign({ id: userCreated._id }, SECRET, { expiresIn: TOKEN_VALID_MINS * 60 });
	res.cookie('auth_tok', token);

	return res.redirect("/dashboard");
    } catch (error) {
	console.log('Error in signup:', error);
	return res.json({ status:"error", Api_Response: 304, message: 'Error in signup backend' });
    }

    res.send(JSON.stringify(googleUser));
}

googleOAuthRouter.get('/google-oauth', google_signin);

module.exports = { googleOAuthRouter, getGoogleAuthURL };
