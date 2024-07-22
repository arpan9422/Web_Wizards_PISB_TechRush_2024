const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 10000;
const bodyparser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();
app.use(bodyparser.json());
app.use(cors());
const signupRouter = require('./signupController.js'); 
const loginRouter = require('./LoginControler.js')
const remenderRoute = require('./remenderRoute.js')
async function connectDB() {
  try {
    const MONGO_URI = process.env.MONGO_URI; 
    
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();

app.use('/user', signupRouter);
app.use('/user', loginRouter);
app.use('/api/remainder', remenderRoute);
// http://localhost:3000/user/signup
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


