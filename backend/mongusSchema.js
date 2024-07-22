// models/user.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    date: Date,
    delta: Number,
    name: String,
    recipient: String,
    method: String,
    tags: [String]
});

const userSchema = new mongoose.Schema({

    email: {
	type: String,
	required: true,
	unique: true,
    },
    password: {
	type: String,
	required: true,
    },
    transactions: [TransactionSchema]
});

const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports.User = User;
module.exports.Transaction = Transaction;