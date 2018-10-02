import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../actions/userActions';

class UserForm extends Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			firstName: '',
			lastName: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = e => {
		this.setState({
			[e.target.name]: [e.target.value],
		});
	}
	
	onSubmit = e => {
		e.preventDefault();

		const post = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		}

		this.props.createUser(post);

	}
	
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div>
						<label>First Name: </label> <br/>
						<input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
					</div>
					<br/>
					<div>
						<label>Last Name: </label> <br />
						<input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
					</div>
					<br/>
					<button type="submit">
						Submit
					</button>
				</form>	
			</div>
		)
	}
}

UserForm.propTypes = {
	createUser: PropTypes.func.isRequired,
}

export default connect(null, { createUser})(UserForm);