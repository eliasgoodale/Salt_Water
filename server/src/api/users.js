const express = require('express');
const Joi = require('joi');

const db = require('../db');
const users = db.get('users'); 

const schema = Joi.object().keys({
	firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/).required(),
	lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/).required(),
	username: Joi.string().regex(/^[a-zA-ZÀ-ÿ-_]{4,50}$/).required(),
	password: Joi.string().min(6).max(25).required(),
	isActive: Joi.boolean().required(),
	isListAdmin: Joi.boolean().required(),
	isUserAdmin: Joi.boolean().required(),
	isEntryAdmin: Joi.boolean().required(),
	isLocationManager: Joi.boolean().required(),
	isOperatorAdmin: Joi.boolean().required(),
});

const router = express.Router();

router.get('/', (req, res) => {
	users
		.find()
		.then(allUsers => {
			res.json(allUsers);
		});
});

router.post('/', (req, res, next) => {
	const result = Joi.validate(req.body, schema);
	if (result.error === null) {
		const { firstName, lastName, username, 
						password, isActive, isListAdmin,
						isUserAdmin, isEntryAdmin, isLocationManager,
						isOperatorAdmin } = req.body
		const newUser = {
			firstName, lastName,
			username, password,
			isActive, isListAdmin,
			isUserAdmin, isEntryAdmin, 
			isLocationManager,
			isOperatorAdmin,
			date: new Date(),
		};
		users
			.insert(newUser)
			.then(insertedUser => {
				res.json(insertedUser);
			});
	}
	else {
		next(result.error);
	}
})
module.exports = router;
