const express = require('express');
const querystring = require('querystring');
const stream = require('node:stream');

const SERVER_ROOT_URI = "http://localhost:10000";//"https://backupwebwizards.onrender.com";
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

function streamToString (str) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    str.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    str.on('error', (err) => reject(err));
    str.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
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
	  .then((res) => res.data)
	  .catch((error) => {
	      console.error(`Failed to fetch user`);
	      throw new Error(error.message);
	  });

    console.log("user:" + googleUser);

    res.send("Done");
}

googleOAuthRouter.get('/google-oauth', google_signin);

module.exports = { googleOAuthRouter, getGoogleAuthURL };
