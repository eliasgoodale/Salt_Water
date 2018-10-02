import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Joi from "joi";

// Pass in submit method, url, data,

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/users' : 'production-url';

// const schema = Joi.object().keys({
// 	firstName: Joi.string()
// 		.regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/)
// 		.required(),
// 	lastName: Joi.string()
// 		.regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/)
// 		.required(),
// 	username: Joi.string()
// 		.regex(/^[a-zA-ZÀ-ÿ-_]{4,50}$/)
// 		.required(),
// 	password: Joi.string()
// 		.min(6)
// 		.max(25)
// 		.required(),
// 	isActive: Joi.boolean().required(),
// 	isListAdmin: Joi.boolean().required(),
// 	isUserAdmin: Joi.boolean().required(),
// 	isEntryAdmin: Joi.boolean().required(),
// 	isLocationManager: Joi.boolean().required(),
// 	isOperatorAdmin: Joi.boolean().required()
// });

const styles = theme => ({
	FormControl: {
		width: 200,
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	TopButtons: {
		margin: 30
	}
});

export default class UserForm extends Component {
	constructor(props) {
		super(props);

		this.handleInput = this.handleInput.bind(this);
		// this.createUser = this.createUser.bind(this);
	}
	
	state = {
		formData: this.props.formData,
		sendingForm: false,
		checked: [],
		sentForm: false,
		postUrl: this.props.postUrl
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.formData !== prevState.formData) {
			return { formData: nextProps.formData };
		}
		else return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.formData !== this.props.formData) {
			let {formData} = this.props.formData
			this.setState({formData: formData})
		}
	}
	// formIsValid = () => {
	// 	const { formData } = this.state
	// 	const newUser = {
	// 		firstName: formData.firstName,
	// 		lastName: formData.lastName,
	// 		username: formData.username,
	// 		password: formData.password,
	// 		isActive: formData.isActive,
	// 		isListAdmin: formData.isListAdmin,
	// 		isUserAdmin: formData.isUserAdmin,
	// 		isEntryAdmin: formData.isEntryAdmin,
	// 		isLocationManager: formData.isLocationManager,
	// 		isOperatorAdmin: formData.isOperatorAdmin
	// 	};
	// 	const result = Joi.validate(newUser, schema);
	// 	//console.log(result);
	// 	return result.error ? false : true;
	// };

	// createUser = (newUser) => {
	// 	console.log("called method")
	// 	const url = API_URL;
	// 	// console.log(`${url} ${prevData} ${newUser}`);
	// 	if (this.formIsValid()) {
	// 		fetch(url, {
	// 			method: "POST",
	// 			headers: {
	// 				"content-type": "application/json"
	// 			},
	// 			body: JSON.stringify({
	// 				firstName: newUser.firstName,
	// 				lastName: newUser.lastName,
	// 				username: newUser.username,
	// 				password: newUser.password,
	// 				isActive: newUser.isActive,
	// 				isListAdmin: newUser.isListAdmin,
	// 				isUserAdmin: newUser.isUserAdmin,
	// 				isEntryAdmin: newUser.isEntryAdmin,
	// 				isLocationManager: newUser.isLocationManager,
	// 				isOperatorAdmin: newUser.isOperatorAdmin
	// 			})
	// 		})
	// 			.then(res => res.json())
	// 			.then(message => {
	// 				console.log(message);
	// 				setTimeout(() => {
	// 					this.setState({
	// 						sendingForm: false,
	// 						sentForm: true
	// 					});
	// 				}, 1000);
	// 			});
	// 	}
	// };

	handleCheckboxToggle = value => () => {
		let {formData} = this.state
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];
		const initialFormData = this.state.formData;
		if (currentIndex === -1) {
			newChecked.push(value);
			switch (value) {
				case 0:
					formData["isActive"] = true;
					this.setState({formData});
					break;
				case 1:
					formData["isListAdmin"] = true;
					this.setState({ formData });
					break;
				case 2:
					formData["isUserAdmin"] = true;
					this.setState({ formData });	
					break;
				case 3:
					formData["isEntryAdmin"] = true;
					this.setState({ formData });
					break;
				case 4:
					formData["isLocationManager"] = true;
					this.setState({ formData });
					break;
				case 5:
					formData["isOperatorAdmin"] = true;
					this.setState({ formData });
					break;
				default:
					break;
			}
		} else {
			newChecked.splice(currentIndex, 1);
			switch (value) {
				case 0:
					formData["isActive"] = false;
					this.setState({ formData });
					break;
				case 1:
					formData["isListAdmin"] = false;
					this.setState({ formData });
					break;
				case 2:
					formData["isUserAdmin"] = false;
					this.setState({ formData });
					break;
				case 3:
					formData["isEntryAdmin"] = false;
					this.setState({ formData });
					break;
				case 4:
					formData["isLocationManager"] = false;
					this.setState({ formData });
					break;
				case 5:
					formData["isOperatorAdmin"] = false;
					this.setState({ formData });
					break;
				default:
					break;
			}
		}

		this.setState({
			checked: newChecked
		});

	};


	logSubmission = event => {
		event.preventDefault();
		console.log(this.state.formData);
	}

	handleToggle = () => {
		this.setState({
			open: !this.state.open
		});
	};

	handleInput = e => {
		let {formData} = this.state;
		const name = e.target.name;
		const value = e.target.value;
		formData[name] = value		
		// console.log([name])
		// console.log(value)
		// console.log(this.state.formData)
		this.setState({formData});
	};

	onSubmit = e => {
		e.preventDefault();
		const { formData } = this.state;


		console.log(formData)
		if (formData._id === "")
			this.props.createUser(formData);
		else
			this.props.updateUser(formData);
		this.props.close();

	}


	render() {
	
		const {
			_id,
			firstName,
			lastName,
			username,
			password,
			isActive,
			isListAdmin,
			isUserAdmin,
			isEntryAdmin,
			isLocationManager,
			isOperatorAdmin
		} = this.state.formData;

		// const submitFunc = username === "" ? this.props.createUser : this.props.updateUser
		const submitButtonTitle = _id === "" ? "Create" : "Update";

		const {formData} = this.state;
		// console.log(this.state.formData);	
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.clearForm}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">New User</DialogTitle>
				{/*create cancel button for user dialog form redact click outside of box to cancel and clear the state*/}
				<DialogContent>

			<form id="user-form" onSubmit={this.onSubmit} >
				<TextField
					// className={classes.FormControl}
					label="First Name"
					name="firstName"
					value={firstName}
					onChange={this.handleInput}
					margin="normal"
				/>

				<TextField
					// className={classes.FormControl}
					label="Last Name"
					name="lastName"
					value={lastName}
					onChange={this.handleInput}
					margin="normal"
				/>
				<br />
				<TextField
					// className={classes.FormControl}
					label="Username"
					name="username"
					value={username}
					onChange={this.handleInput}
					margin="normal"
				/>

				<TextField
					// className={classes.FormControl}
					label="Password"
					name="password"
					value={password}
					onChange={this.handleInput}
					autoComplete="current-password"
					margin="normal"
				/>
				<List>
							<ListItem
								key={undefined}
								role={undefined}
								dense
								button
								onClick={this.handleCheckboxToggle(0)}
							>
								<Checkbox
									checked={this.state.checked.indexOf(0) !== -1}
									tabIndex={-1}
									disableRipple
								/>
								<ListItemText primary={`Active`} />
							</ListItem>

							<ListItem
								key={undefined}
								role={undefined}
								dense
								button
								onClick={this.handleCheckboxToggle(1)}
							>
								<Checkbox
									checked={this.state.checked.indexOf(1) !== -1}
									tabIndex={-1}
									disableRipple
								/>
								<ListItemText primary={`List Admin`} />
							</ListItem>

							<ListItem
								key={undefined}
								role={undefined}
								dense
								button
								onClick={this.handleCheckboxToggle(2)}
							>
								<Checkbox
									checked={this.state.checked.indexOf(2) !== -1}
									tabIndex={-1}
									disableRipple
								/>
								<ListItemText primary={`User Admin`} />
							</ListItem>

							<ListItem
								key={undefined}
								role={undefined}
								dense
								button
								onClick={this.handleCheckboxToggle(3)}
							>
								<Checkbox
									checked={this.state.checked.indexOf(3) !== -1}
									tabIndex={-1}
									disableRipple
								/>
								<ListItemText primary={`Entry Admin`} />
							</ListItem>

							<ListItem
								key={undefined}
								role={undefined}
								dense
								button
								onClick={this.handleCheckboxToggle(4)}
							>
								<Checkbox
									checked={this.state.checked.indexOf(4) !== -1}
									tabIndex={-1}
									disableRipple
								/>
								<ListItemText primary={`Location Manager`} />
							</ListItem>
							<ListItem
								key={undefined}
								role={undefined}
								dense
								button
								onClick={this.handleCheckboxToggle(5)}
							>
								<Checkbox
									checked={this.state.checked.indexOf(5) !== -1}
									tabIndex={-1}
									disableRipple
								/>
								<ListItemText primary={`Operator Admin`} />
							</ListItem>
				</List>
				<Button
					variant="contained"
					color="primary"
					type="submit"
				//  disabled={!this.formIsValid()}
				//  onClick={this.createUser(formData)}
				>
					{submitButtonTitle}
        </Button>
				<Button
					variant="contained"
					color="inherit"
					onClick={this.props.close}
					>
						Cancel
					</Button>
			</form>
				</DialogContent>
				<DialogActions />
			</Dialog>
		);
	}
}
