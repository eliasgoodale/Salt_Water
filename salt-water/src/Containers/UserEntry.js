import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Update from '@material-ui/icons/Update';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


/*Delete this later after passing from Mainscreen as prop*/
import Joi from 'joi';

const styles = theme => ({
	FormControl : {
		width: 200,
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	TopButtons: {
		margin: 30,

	}

})
/* What I need to do is create an array of each item mapped to the state of the component */

class UserEntry extends Component {
	constructor (props) {
		super(props);
	}
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
			//Addusertotable()
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
                    this.setState({
	updateId: (this.isSelected(n.id) && this.state.selected.length === 1) ? n.id : -1
}),
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
				<Tooltip title="Create User">
					<Button
						className={classes.TopButtons} 
						variant="fab" 
						onClick={this.handleToggle}
						aria-label="Create User" 
						mini
					>
						<AddIcon />
					</Button>
				</Tooltip>
				<Tooltip title="Deactivate User(s)">
					<Button
						className={classes.TopButtons} 
						variant="fab" 
						color="secondary"
						aria-label="Deactivate User(s)" 
						mini>
						<NotInterestedIcon />
					</Button>
				</Tooltip>
				<Tooltip title="Update User">
					<Button
						className={classes.TopButtons}
						variant="fab"
						aria-label="Update User"
						mini
						>
						<Update/>
					</Button>
				</Tooltip>
				<Dialog
					open={this.state.open}
					onClose={this.handleToggle}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						New User
					</DialogTitle>
				{/*create cancel button for user dialog form redact click outside of box to cancel and clear the state*/}	
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
						<Button  
							color="primary" 
							variant="raised" 
							onClick={this.handleSubmit}
							disabled={!this.formIsValid()}
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