const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require("./mongusSchema.js");
dotenv.config(); // Initialize environment variables

const analyticsFetchRouter = express.Router();

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

function in_scope(date, scope)
{
    let scope_type = scope["type"];
    let scope_range = new Date(scope["range"]); // a date object
    if (scope_type == "year")
    {
	return date.getYear() == scope_range.getYear();
    }
    else if (scope_type == "month")
    {
	return date.getYear() == scope_range.getYear() && date.getMonth() == scope_range.getMonth();
    }
}

function add_safe(key, value, object)
{
    if (!(key in object))
    {
	object[key] = value;
    }
    else
    {
	object[key] = value;
    }
}

async function get_data(user, scope)
{
    let result = {
	income: 0,
	expense: 0,
	balance: 0,
	expense_fractions: {},
	income_fractions: {}
    };
    
    for (transaction of user.transactions)
    {
	if (in_scope(transaction.date, scope))
	{
	    result.balance += transaction.delta;
	    
	    if (transaction.delta > 0)
	    {
		result.income += transaction.delta;

		add_safe(transaction.name, transaction.delta, result.income_fractions);
	    }
	    else
	    {
		result.expense -= transaction.delta;

		add_safe(transaction.name, -transaction.delta, result.expense_fractions);
	    }
	}
    }

    // convert the fractions into a percentage
    Object.keys(result.expense_fractions).forEach((key) => {
	result.expense_fractions[key] /= (result.expense / 100);	
    });

    Object.keys(result.income_fractions).forEach((key) => {
	result.income_fractions[key] /= (result.income / 100);	
    });
    

    return result;
    
}

// login function (code 400 : bad request, 410: user not found, 411: wrong password)
async function fetch_analytics(req, res) {

    const userid = check_auth_tok(req);

    try {

	if (!userid)
	{
	    return res.status(403).send('{ "error":"Unauthorized" }');
	}
	
	// see if user exists
	const user = await User.findOne({ _id: userid });

	// send email
	let data = await get_data(user, req.body["scope"]);
	
	return res.status(200).json(data);
	
    } catch (error) {
	console.log('Error in login:', error);
	return res.status(410).json({ Api_Response: 304, message: 'Error user not found (see analyticsController.js)' });
    }
}

analyticsFetchRouter.post('/fetchAnalytics', fetch_analytics);

module.exports = analyticsFetchRouter;
