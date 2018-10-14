import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Add} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Form from './Form';

const styles = theme => ({
	FormControl: {
		width: 300,
	},
})


export default withStyles(styles) (class extends Component {
	state = {
		open: false,

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
	}
	
	handleToggle = () => {
		this.setState({
			open: !this.state.open,
		})
	}



	render () {
		const {open, 
			user: {
				firstName,
				lastName,
				username,
				password,
				isActive,
				isListAdmin,
				isUserAdmin,
				isEntryAdmin,
				isLocationManager,
				isOperatorAdmin,
			}, 
		} = this.state
		const { classes, onCreate } = this.props
		return (
			<Fragment>
			<Button 
				variant="fab"
				mini
				onClick={this.handleToggle}
			>
				<Add/>
			</Button>
			<Dialog
				open={open}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Create a New User</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Fill out the form and press Create to add the user to the database
							</DialogContentText>
						<Form
							onSubmit={onCreate}
							onClose={this.handleToggle} 
						/>
				</DialogContent>
				<DialogActions>

				</DialogActions>
			</Dialog>	
			</Fragment>
		)
	}
})