import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //connects your components to the store that was provided by the provider component
import { fetchUsers } from '../actions/userActions';

class UserList extends Component {
	componentWillMount() {
		const users = this.props.fetchUsers();
		console.log(users);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.newUser) {
			this.props.users.unshift(nextProps.newUser) //unshift adds to the beginning
		}
	}

	render() {
		const userList = this.props.users.map(user => (
			<div key={user._id}>
				<h3> {user.firstName}</h3>
				<p>{user.lastName}</p>
			</div>
		))
		return (
			<div>
				<h1>Users</h1>
				<div>
					<h3>
						{userList}
					</h3>
				</div>
			</div>
		)
	}
}

UserList.propTypes = {
	fetchUsers: PropTypes.func.isRequired,
	users: PropTypes.array.isRequired,
	newUser: PropTypes.object,
}

const mapStateToProps = state => ({
	users: state.users.userList, //posts refers to the key in the rootReducer
	newUser: state.users.createdUser, //refers to the new item posted
})


export default connect(mapStateToProps, { fetchUsers })(UserList);