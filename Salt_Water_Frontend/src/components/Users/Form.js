import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Add } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	FormControl: {
		width: 300
	}
})

export default withStyles(styles)(class extends Component {
	state = this.getInitState()

	getInitState() {
		const { user } = this.props

		return user ? user : {
			firstName: "",
			lastName: "",
			username: "",
			password: "",
			isActive: true,
			isListAdmin: false,
			isUserAdmin: false,
			isEntryAdmin: false,
			isLocationManager: false,
			isOperatorAdmin: false
		}
	}

	componentWillReceiveProps({ user }) {
		this.setState({
			...user
		})
	}

	handleInput = name => ({ target: {value} }) => {
		this.setState({
				[name]: value,
		})
	}

	handleSubmit = () => {
		const { user } = this.state

		// make a post request first and get the created _id back and add it into the state

		this.props.onSubmit(user)
		this.setState({
			user: {
				firstName: "",
				lastName: "",
				username: "",
				password: "",
				isActive: true,
				isListAdmin: false,
				isUserAdmin: false,
				isEntryAdmin: false,
				isLocationManager: false,
				isOperatorAdmin: false,
			}
		})
	}

	render() {
		const { 
			firstName,
			lastName,
			username,
			password,
			isActive,
			isListAdmin,
			isUserAdmin,
			isEntryAdmin,
			isLocationManager,
			isOperatorAdmin, } = this.state
			const { classes, user, handleToggle, onClose } = this.props
		return <form>
			<TextField
				label="First Name"
				value={firstName}
				onChange={this.handleInput('firstName')}
				margin="normal"
				className={classes.FormControl}
			/>
			{' '}
			<TextField
				label="Last Name"
				value={lastName}
				onChange={this.handleInput('lastName')}
				margin="normal"
				className={classes.FormControl}
			/>
			<br />
			<TextField
				label="Username"
				value={username}
				onChange={this.handleInput('username')}
				margin="normal"
				className={classes.FormControl}
			/>
			{' '}
			<TextField
				label="Password"
				value={password}
				onChange={this.handleInput('password')}
				margin="normal"
				className={classes.FormControl}
			/>
			<br />
			<Button
				color="primary"
				variant="raised"
				onClick={this.handleSubmit}
			>
				{user ? 'Save' : 'Create'}
			</Button>
			<Button onClick={onClose} >
					Cancel
			</Button>
		</form>
	}
})