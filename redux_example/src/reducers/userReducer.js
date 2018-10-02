import { FETCH_USERS, CREATE_USER, UPDATE_USER} from '../actions/types';

const initialState = {
	userList: [],
	createdUser: {},
	updatedUser: {},
}

/*
	In postActions we send the action.type and json payload using the dispatch method
*/

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS:
			return {
				...state,
				userList: action.payload, 
			};
		case CREATE_USER:
			return {
				...state,
				createdUser: action.payload,
			};
		case UPDATE_USER:
			return {
				...state,
				updatedUser: action.payload,	
			};
		default:
			return state;
	}
}