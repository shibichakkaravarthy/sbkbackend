const mongoose = require('mongoose');


const attendance_user = new mongoose.Schema({
	userID: {type: String, unique: true, required: true},
	username: {type: String, required: true},
	password: String
});

const date = new mongoose.Schema({
	date: String,
	checkIn: [{
		userID: String,
		time: String
	}],
	checkout: [{
		userID: String,
		time: String
	}]
});

const tpeSchema = new mongoose.Schema({
	name: String,
	personToSee: String,
	reason: String,
	time: String
})

module.exports = {
	attendance_user: attendance_user,
	date: date,
	tpeSchema
};
