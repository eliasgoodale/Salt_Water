import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Joi from 'joi';

const styles = theme => ({
	FormControl : {
		width: 200
	}

})

class UserEntry extends Component {
	state = {
		open: false,
		newUser: {
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
		},
		checked: [0],
		sendingForm: false,
		sentForm: false,
		postUrl: this.props.postUrl,
	}

	formIsValid = (schema=this.props.schema) => {
		const { newUser } = this.state;
		const result = Joi.validate(newUser, schema);
		console.log(result);
		return result.error ? false : true;
	};

	submitForm = (url=this.state.postUrl) => {

			fetch(url, {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					username: this.state.username,
					password: this.state.password,
					isActive: this.state.isActive,
					isListAdmin: this.state.isListAdmin,
					isUserAdmin: this.state.isUserAdmin,
					isEntryAdmin: this.state.isEntryAdmin,
					isLocationManager: this.state.isLocationManager,
					isOperatorAdmin: this.state.isOperatorAdmin
				})
			}).then(res => res.json()).then(message => {
					console.log(message);
					setTimeout(() => { 
						this.setState({ sendingForm: false, sentForm: true });
					}, 1000);
				});
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.formIsValid()) {
			this.setState({
				sendingForm: true
			});
			this.submitForm();
			this.setState ({
				open: false,
				newUser: {
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
				},
			})
		}

	}

	handleToggle = () => {
		this.setState({
			open: !this.state.open,
		});
	}

	handleInput = name => ({target: { value }}) => {
		this.setState({
			newUser: {
			...this.state.newUser,
			[name]: value
			}
		});
	};

	render () {
		const { open, newUser:
			{	firstName, lastName, username, password, isActive, isListAdmin, 
				isUserAdmin, isEntryAdmin, isLocationManager, isOperatorAdmin, } 
		} = this.state
		const { classes } = this.props 
		return (
			<Fragment>
				<Button variant="fab" onClick={this.handleToggle} mini>
					<AddIcon />
				</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleToggle}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						New User
					</DialogTitle>

					<DialogContent>
						<DialogContentText>
							Insert helpful text here
						</DialogContentText>
							<form>
								<TextField
								className={classes.FormControl}
									label="First Name"
									value={firstName}
									onChange={this.handleInput("firstName")}
									margin="normal"
								/>
								{' '}
								<TextField
								className={classes.FormControl}
									label="Last Name"
									value={lastName}
									onChange={this.handleInput("lastName")}
									margin="normal"
								/>
								<br/>
								<TextField
								className={classes.FormControl}
									label="Username"
									value={username}
									onChange={this.handleInput("username")}
									margin="normal"
								/>
								{' '}
								<TextField
								className={classes.FormControl}
									label="Password"
									type="password"
									value={password}
									onChange={this.handleInput("password")}
									autoComplete="current-password"
									margin="normal"
								/>
							</form>
					</DialogContent>
					<DialogActions>
						<Button  color="primary" variant="raised" 
							onClick={this.handleSubmit}
							>
							Create
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

export default withStyles(styles)(UserEntry);