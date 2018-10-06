import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	FormControl: {
		width: 200,
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},

	ChecboxControl: {
		dense: true,
		button: true,
	}
})

const textFieldVariants = {
	"firstName": "First Name",
	"lastName": "Last Name",
	"username": "Username",
	"password": "Password",
}

const checkboxFieldVariants = {
	"isActive": "Active",
	"isListAdmin": "List Admin",
	"isUserAdmin": "User Admin",
	"isEntryAdmin": "Entry Admin",
	"isLocationManager": "Location Manager",
	"isOperatorAdmin": "Operator Admin",
}

generateTextFields = (fields=textFieldVariants) => {
	const textFieldStateKeys = Object.keys(fields);
	const textFieldLabels = Object.values(fields);
	const textFields = [];
	for (var i = 0; i < fields.length; i++) {
		textFields.push({
			className: classes.FormControl,
			label: textFieldLabels[i],
			value: textFieldStateKeys[i],
			onChange: this.handleInput(textFieldStateKeys[i]),
		})
	}
} 

generateCheckboxFields = (fields=checkboxFieldVariants) =>
{
	const checkboxStateKeys = Object.keys(fields);
	const checkboxLabels = Object.values(fields);
	const checboxes = [];
	for (var i = 0; i < fields.length; i++) {
		checkboxes.push({
			className: classes.CheckboxControl,
			label: textFieldLabels[i],
			value: textFieldStateKeys[i],
			onChange: this.handleInput(textFieldStateKeys[i]),
			margin: "normal",
		})
	}
}
generateForm = (textFieldVariants, checkboxFieldVariants) => {

}

const textFields = [
	{
		className: classes.FormControl,

	}
] 
