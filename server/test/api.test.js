const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
	it('responds with a json message', function(done) {
		request(app)
			.get('/api/v1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, {
				message: 'API - 👋🌎🌍🌏' 
			}, done);
	});
});



/*	This API test is for testing that the json object sent to the server
		matches the regex pattern specified in users.js
*/
describe('POST /api/v1/users', () => {
	it('responds with inserted user', function(done) {
		const requestObj = {
			firstName: 'Jimmy' ,
			lastName: 'Dean',
			username: 'jdean',
			password: 'sausages123',
			isActive: true,
			islistAdmin: false,
			isUserAdmin: false,
			isEntryAdmin: false,
			isLocationManager: false,
			isOperatorAdmin: false,
		};

		const responseObj= {
			...requestObj,
			date: '2018-09-18T03:05:52.981Z',
			_id: '5ba06b900a99365020525dfd',
		};

		request(app)
			.post('/api/v1/users')
			.send(requestObj)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(res => {
				res.body._id = '5ba06b900a99365020525dfd'
				res.body.date = '2018-09-18T03:05:52.981Z'
			})
			//added to expect 200, result, done
			.expect(200, responseObj, done);
	});
});
