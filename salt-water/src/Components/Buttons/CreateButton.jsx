import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
	CreateUser: {
		background: "linear-gradient(0deg, #7173e2 20%, #464ac4 90%)",
		borderRadius: 3,
		border: 0,
		height: 48,
		color: "black",
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px #4d4d63"
	},
};

const CreateButton = props => {
	console.log(props.style);
	const { classes } = props;

	return (
		<Button className={classes.CreateUser} onClick={props.action}>
			Create User
    </Button>
	);
};

export default withStyles(styles)(CreateButton);
