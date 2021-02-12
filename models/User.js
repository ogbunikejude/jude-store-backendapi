const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'first name is required'],
	},
	lastname: {
		type: String,
		required: [true, 'last name is required'],
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password is required'],
	},
	phone_number: {
		type: Number,
		required: [true, 'Phone number is needed'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
	token: {
		type: String,
	},
});

module.exports = mongoose.model('User', userSchema);
