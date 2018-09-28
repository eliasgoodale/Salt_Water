import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

export default class UserEntry extends Component {
	state = {
		open: false,
		newUser: {
			firstName: "",
			lastName: "",
			username: "",
			password: "",
			isActive: false,
			isListAdmin: false,
			isUserAdmin: false,
			isEntryAdmin: false,
			isLocationManager: false,
			isOperatorAdmin: false,
		},
		checked: [0],
	}

	handleToggle = () => {
		this.setState({
			open: !this.state.open,
		});
	}

	handleInput = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	render () {
		const { 
			open, 
			newUser: { 
			firstName, lastName, username,
			password,isActive,isListAdmin,
			isUserAdmin, isEntryAdmin, isLocationManager,
			isOperatorAdmin,
			} } = this.state
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
									label="First Name"
									value={this.state.firstName}
									onChange={this.handleInput("firstName")}
									margin="normal"
								/>
								<TextField
									label="Last Name"
									value={this.state.lastName}
									onChange={this.handleInput("lastName")}
									margin="normal"
								/>
								<TextField
									label="Username"
									value={this.state.username}
									onChange={this.handleInput("username")}
									margin="normal"
								/>
								<TextField
									id="standard-password-input"
									label="Password"
									type="password"
									value={this.state.password}
									onChange={this.handleInput("password")}
									autoComplete="current-password"
									margin="normal"
								/>
							</form>
					</DialogContent>
					<DialogActions>
						<Button  color="primary" variant="raised">
							Create
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}