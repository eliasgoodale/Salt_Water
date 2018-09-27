const express = require('express');

const users = require('./users');

const router = express.Router();

/*
	This is the basic slash route for the API. You may mount other
	routes using router.use('/route', routefile)
*/

router.get('/', (req, res) => {
	res.json({
		message: 'API - 👋🌎🌍🌏' 
	});
});

router.use('/users', users);

module.exports = router;
