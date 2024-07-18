// (defkeybind "C-c C-r" (save-buffer) (async-shell-command "node index.js"))

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyparser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();
app.use(bodyparser.json());
app.use(cors());

app.use(express.static(process.cwd() + '/../frontend')); 

const signupRouter = require('./signupController.js'); 
const loginRouter = require('./LoginControler.js')
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

connectDB();

app.use('/user', signupRouter);
app.use('/user', loginRouter);

app.get('/login', (req, res) => {
    // Send the HTML file as the response
    var options = {'root':'../frontend'};
    res.sendFile('login.html',options);
});

app.get('/signup', (req, res) => {
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, '../frontend/singup.html'));
});

// http://localhost:3000/user/signup
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


