import React, { Component, Fragment } from 'react';
import Header from './Layout/Header'; 
import './App.css';
import UserTable from './userTable.js';
import Joi from 'joi';

/* Have a function that dynamically switches the url based on availability */
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/users' : 'production-url'

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

class App extends Component {
	state = {
		apiUrl: API_URL,
	}
	render() {
		return (
			<Fragment>
			<Header	
				schema={schema}
				apiUrl = {this.state.apiUrl}
			/>
			<UserTable
				getUrl={this.state.apiUrl}
			/>

			</Fragment>
		);
	}
}

export default App;
