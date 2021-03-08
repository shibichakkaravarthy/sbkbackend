const mongoose = require('mongoose');


const user = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	savedPasswords: String
});


const savedPassword = new mongoose.Schema({
	passwords: [{
		title: String,
		url: String,
		password: String
	}]
});


module.exports = {
	user: user,
	savedPassword: savedPassword
}