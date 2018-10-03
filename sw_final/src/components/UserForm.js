import React, { Component } from "react";
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
import PropTypes from 'prop-types';

const blankData = {
	_id: "",
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
};


export default class UserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: this.props.formData,
			sendingForm: false,
			checked: [],
		};

		this.handleInput = this.handleInput.bind(this);
		this.clearForm = this.clearForm.bind(this);

	}

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

	clearForm = () => {
		console.log('called');
		this.setState({
			formData: blankData,
		})
	}

	handleInput = e => {
		let {formData} = this.state;
		const name = e.target.name;
		const value = e.target.value;
		formData[name] = value		
		this.setState({formData});
	};

	onSubmit = e => {
		e.preventDefault();
		const { formData } = this.state;


		//console.log(formData)
		this.props.submit(formData);
		this.props.close();

	}


	render() {
		

		const {formData, open, close, formIsValid, buttonTitle} = this.props 
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
		} = formData;
		// console.log(this.props.submit);
		// console.log(close);
		return (
			<Dialog
				open={open}
				onClose={this.clearForm}
				aria-labelledby="create-update-form"
			>
				<DialogTitle id="form-dialog-title">{buttonTitle}</DialogTitle>
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
									checked={isActive}
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
									checked={isListAdmin}
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
									checked={isUserAdmin}
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
									checked={isEntryAdmin}
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
									checked={isLocationManager}
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
									checked={isOperatorAdmin}
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
				>
					{buttonTitle}
        </Button>
				<Button
					variant="contained"
					color="inherit"
					onClick={close}
					//disabled={this.formIsValid}
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

UserForm.propTypes = {
	formData: PropTypes.object.isRequired,
}

UserForm.defaultProps = {
	formData: blankData,
}
