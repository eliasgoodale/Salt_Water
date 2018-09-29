import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
	root: {
		background: "linear-gradient(0deg, #f26c57 20%, #ed3012 90%)",
		borderRadius: 3,
		border: 0,
		height: 48,
		color: "black",
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px #4d4d63"
	}
};

const DeactivateButton = props => {
	console.log(props.style);
	const { classes } = props;

	return (
		<Button className={classes.root} onClick={props.action}>
			Disable
    </Button>
	);
};

export default withStyles(styles)(DeactivateButton);