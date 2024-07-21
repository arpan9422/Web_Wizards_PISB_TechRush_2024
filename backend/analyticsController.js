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

function in_scope(current_date, date, scope)
{
    if (scope == "this-year")
    {
	return date.getYear() == current_date.getYear();
    }
    else if (scope == "this-month")
    {
	return date.getYear() == current_date.getYear() && date.getMonth() == current_date.getMonth();
    }

    
    let last_month = structuredClone(current_date).setDate(0).getMonth();
    
    return date.getYear() == current_date.getYear() && date.getMonth() == last_month;
}

async function get_data(user, scope)
{
    let result = {
	income: 0,
	expense: 0,
	balance: 0,
	expense_fractions: {}
    };

    let current_date = new Date();
    
    for (transaction of user.transactions)
    {
	if (in_scope(current_date, transaction.date, scope))
	{
	    result.balance += transaction.delta;
	    
	    if (transaction.delta > 0)
	    {
		result.income += transaction.delta;
	    }
	    else
	    {
		result.expense -= transaction.delta;

		if (!(transaction.name in result.expense_fractions))
		{
		    result.expense_fractions[transaction.name] = -transaction.delta;
		}
		else
		{
		    result.expense_fractions[transaction.name] -= transaction.delta;
		}
	    }
	}
    }

    Object.keys(result.expense_fractions).forEach((key) => {
	result.expense_fractions[key] /= (result.expense / 100);	
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
