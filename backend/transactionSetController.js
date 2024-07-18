const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User, Transaction } = require("./mongusSchema.js");
dotenv.config(); // Initialize environment variables

const transactionSetRouter = express.Router();


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

async function add_transaction(userid, delta, date, name, recipient, method, tags)
{
    const user = await User.findOne({ _id : userid });

    const transaction = new Transaction({
	date: date,
	delta: delta,
	name: name,
	recipient: recipient,
	method: method,
	tags: tags
    });
    
    user.transactions.push(transaction);

    await user.save();
}

async function set_transactions(req, res) {

    const userid = check_auth_tok(req);

    try {

	if (!userid)
	{
	    return res.status(403).send('{ "error":"Unauthorized" }');
	}

	switch (req.body["operation"])
	{
	    case "add":
	    await add_transaction(userid,
				  Number(
				      req.body["delta"]),
				  req.body["date"],
				  req.body["name"],
				  req.body["recipient"],
				  req.body["method"],
				  req.body["tags"]);
	    break;
	    case "del":
	    console.log("delete transaction requested");
	    break;
	}
	
	return res.status(200).json({ "status":"success" });
	
    } catch (error) {
	console.log('Error in login:', error);
	return res.status(410).json({ Api_Response: 304, message: 'Error user not found (see transactionSetController.js)' });
    }
}

transactionSetRouter.post('/setTransactions', set_transactions);

module.exports = transactionSetRouter;
