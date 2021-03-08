const egateRouter = require('express').Router();
const mongoose = require('mongoose');

const {attendance_user, date} = require('./model.js');

const attendance_users = mongoose.model('attendance_users', attendance_user);
const dates = mongoose.model('dates', date);

egateRouter.post('/egate-login', (req, res) => {
	const {userID, password} = req.body;

	attendance_users.findOne({userID: userID}, (err, doc) => {
		if (err) {
			res.json(`User doesn't exist`);
			return;
		}
		if (doc.password === password) 
			res.json({userID: doc.userID, username: doc.username});
		else 
			res.json('Invalid username or password');
	})

})

egateRouter.put('/checkin', (req, res) => {
	const {date, userID, time} = req.body;

	dates.findOne({date: date}, (err, doc) => {
		if (err) {
			let newDate = new dates({
				date: date,
				checkin: [{
					userID: userID,
					time: time
				}]
			})

			newDate.save((err, newDoc) => {
				if (err) {
					res.json({checkedIn: false, err: 'Oops something went wrong!'});
					return;
				}

				res.json({checkedIn: true});
				return;
			});
		}

		doc.checkIn.push({
			userID: userID,
			time: time
		});

		doc.save((err, newDoc) => {
			if (err) {
				res.json({checkedIn: false, err: 'Oops something went wrong!'});
				return;
			}
			res.json({checkedIn: true});
			return;
		});
	})
})

egateRouter.put('/checkout', (req, res) => {
	const {date, userID, time} = req.body;

	dates.findOne({date: date}, (err, doc) => {
		if (err) {
			let newDate = new dates({
				date: date,
				checkout: [{
					userID: userID,
					time: time
				}]
			})

			newDate.save((err, newDoc) => {
				if (err) {
					res.json({checkedout: false, err: 'Oops something went wrong!'});
					return;
				}

				res.json({checkedout: true});
				return;
			});
		}

		doc.checkout.push({
			userID: userID,
			time: time
		});

		doc.save((err, newDoc) => {
			if (err) {
				res.json({checkedout: false, err: 'Oops something went wrong!'});
				return;
			}
			res.json({checkedout: true});
			return;
		});
	})
})

egateRouter.post('/push', (req, res, next) => {
    res.json("egateRouter Push Working")
})

egateRouter.get('/pull', (req, res, next) => {
    res.json("egateRouter Pull Working")
})

module.exports = egateRouter;