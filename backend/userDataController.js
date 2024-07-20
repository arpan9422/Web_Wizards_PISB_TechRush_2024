const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require("./mongusSchema.js");
dotenv.config(); // Initialize environment variables

const userdataFetchRouter = express.Router();

function check_auth_tok(req)
{
    const token = req.cookies['auth_tok'];
    
    try {
	var decoded = jwt.verify(token, process.env.SECRETS);
	// if no error is thrown, then return true
	return decoded["id"];
    } catch(err) {
	if (err['name'] == 'TokenExpiredError')
	{
	    return null;
	}
    }
}

// login function (code 400 : bad request, 410: user not found, 411: wrong password)
async function fetch_userdata(req, res) {

    const userid = check_auth_tok(req);
    console.log(userid);

    try {

	if (!userid)
	{
	    return res.status(403).send('{ "error":"Unauthorized" }');
	}
	
	// see if user exists
	const user = await User.findOne({ _id: userid });

	// send email
	return res.status(200).json({ name: user.email });
	
    } catch (error) {
	console.log('Error in login:', error);
	return res.status(410).json({ Api_Response: 304, message: 'Error user not found (see userDataController.js)' });
    }
}

userdataFetchRouter.post('/fetchUserData', fetch_userdata);

module.exports = userdataFetchRouter;
