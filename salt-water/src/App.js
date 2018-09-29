import React, { Component, Fragment } from 'react';
import Header from './Layout/Header'; 
import './App.css';
import UserTable from './userTable.js';
import Joi from 'joi';

/* Have a function that dynamically switches the url based on availability */
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/users' : 'production-url'

/* 	Have a method that dynamically changes the schema based on which form the user is interacting with */

/* make buttons import from one source */

/* redact tooltip bar with selected users */ 

/* make save button instead of create across update and create forms*/

/* make a method that adds the user to the list on POST */

/* Use the createContext method to pass components down the tree. However, this makes component reuse more difficult. Use it sparingly*/ 

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

class MainScreen extends Component {
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

export default MainScreen;
