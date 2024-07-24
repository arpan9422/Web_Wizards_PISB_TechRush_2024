// (defkeybind "C-c C-r" (save-buffer) (async-shell-command "node index.js"))

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 10000;
const bodyparser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

dotenv.config();
app.use(bodyparser.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static(process.cwd() + '/../frontend')); 

const signupRouter = require('./signupController.js'); 
const loginRouter = require('./LoginControler.js')
const transactionFetchRouter = require('./transactionFetchController.js')
const transactionSetRouter = require('./transactionSetController.js')
const userdataFetchRouter = require('./userDataController.js')
const analyticsFetchRouter = require('./analyticsController.js')

async function connectDB() {
    try {
	const MONGO_URI = process.env.MONGO_URI; 
	
	await mongoose.connect(MONGO_URI);

	console.log('MongoDB connected');
    } catch (error) {
	console.error('MongoDB connection error:', error);
	process.exit(1);
    }
}

function check_auth_tok(req)
{
    const token = req.cookies['auth_tok'];
    
    try {
	jwt.verify(token, process.env.SECRETS);
	// if no error is thrown, then return true
	return true;
    } catch(err) {
	if (err['name'] == 'TokenExpiredError')
	{
	    return false;
	}
    }
}

function redirect_check_auth(req, res, url)
{
    if (check_auth_tok(req))
    {
	res.sendFile(path.join(__dirname, url));
    }
    else
    {
	res.sendFile(path.join(__dirname, '../frontend/login.html'));
    }
}

connectDB();

//app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, "../favicon.ico")));

app.use('/user', signupRouter);
app.use('/user', loginRouter);
app.use('/user', transactionFetchRouter);
app.use('/user', transactionSetRouter);
app.use('/user', userdataFetchRouter);
app.use('/user', analyticsFetchRouter);

app.get('/login', (req, res) => {
    
    // if already logged in, go to dashboard
    if (check_auth_tok(req))
    {	
	res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
	return;
    }
    
    var options = {'root':'../frontend'};
    res.sendFile('login.html',options);
});

app.get('/signup', (req, res) => {
    
    // if already logged in, goto to the dashboard
    if (check_auth_tok(req))
    {	
	res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
	return;
    }
    
    res.sendFile(path.join(__dirname, '../frontend/singup.html'));
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../frontend/landing.html')));
app.get('/goals', (req, res) => res.sendFile(path.join(__dirname, '../frontend/goals.html')));
app.get('/dashboard', (req, res) => redirect_check_auth(req, res, '../frontend/dashboard.html'));
app.get('/transactions', (req, res) => redirect_check_auth(req, res, '../frontend/Transactions.html'));
app.get('/analytics', (req, res) => redirect_check_auth(req, res, '../frontend/analytics.html'));
app.get('/profile', (req, res) => redirect_check_auth(req, res, '../frontend/profile.html'));

// redirect_check_auth('/dashboard', '../frontend/dashboard.html');
// redirect_check_auth('/transactions', '../frontend/Transactions.html');
// redirect_check_auth('/analytics', '../frontend/analytics.html');
// redirect_check_auth('/profile', '../frontend/profile.html');

// http://localhost:3000/user/signup
app.listen(PORT, '192.168.1.53', () => {
    console.log(`Server is running on http://192.168.1.53:${PORT}`);
});


