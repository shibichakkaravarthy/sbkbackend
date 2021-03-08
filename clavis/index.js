const clavisRouter = require('express').Router()
const mongoose = require('mongoose');

const {user, savedPassword} = require('./model.js');

const users = mongoose.model('users', user);
const savedPasswords = mongoose.model('savedPasswords', savedPassword);

clavisRouter.post('/register-clavis', async (req, res) => {
	const {username, password} = req.body;

	let newPasswords = await new savedPasswords();
	newPasswords.save((err, passwords) => {

		if (err) {
			console.log(err);
			res.json('Oops something went wrong!');
			return;
		}

		let newUser = new users ({
			username: username,
			password: password,
			savedPasswords: passwords._id
		});

		newUser.save((err, user) => {
			if (err) {
				res.json('user already exists!');
				return;
			}

			res.json({username: user.username, savedPasswords: user.savedPasswords});
		})
	});

});

clavisRouter.post('/login-clavis', (req, res) => {
	const {username, password} = req.body;

	users.findOne({username: username}, (err, user) => {
		if (err || !user) {
			res.json('Unable to find user');
			return;
		}
		res.json({username: user.username, savedPasswords: user.savedPasswords});
	});
})



clavisRouter.put('/push-passwords', (req, res, next) => {

	const {id, title, url, password} = req.body;

	savedPasswords.findById(id, (err, doc) => {

		let temp = [...doc.passwords], changed = false;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].title === title) 
			{
				doc.passwords[i] = {
					title: title,
					url: url,
					password: password
				}
				changed = true;
				break;
			}
		}

		if (!changed)
			doc.passwords.push({title: title, url: url, password: password});
		console.log(doc);

		doc.save((err, newDoc) => {
			if (err) {
				res.json('unable to update!');
				return;
			}
			res.json({updatedPasswords: doc});
		});
	})
})

clavisRouter.get('/pull-passwords/:id', (req, res, next) => {
    const {id} = req.params;

    savedPasswords.findById(id, (err, doc) => {
    	if (err) {
    		res.json('unable to find document');
    		return;
    	}
    	res.json({passwords: doc});
    })
})

module.exports = clavisRouter;