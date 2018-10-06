import { FETCH_USERS, CREATE_USER, UPDATE_USER } from './types';

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/' : 'production-url';

export const fetchUsers = () => dispatch => {
	console.log('fetching...');
	fetch(API_URL + 'users')
		.then(res => console.log(res.json()))
		.then(users => dispatch({
			type: FETCH_USERS,
			payload: users,
		}));	//dispatch data to the reducer
}

export const createUser = (userData) => dispatch => {
	console.log('posting...');
	fetch(API_URL + 'users', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(userData)
	})
		.then(res => res.json())
		.then(user => dispatch({
			type: CREATE_USER,
			payload: user,
		}));
}

export const updateUser = (updatedData, id) => dispatch => {
	console.log('updating...');
	fetch(API_URL + 'users', {
		method: 'PUT',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(updatedData)
	})
		.then(res => res.json())
		.then(user => dispatch({
			type: UPDATE_USER,
			payload: user,
		}));
}


