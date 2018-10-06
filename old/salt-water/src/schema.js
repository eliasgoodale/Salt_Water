const express = require('express');
const Joi = require('joi');

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
})