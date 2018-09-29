import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    background: "linear-gradient(0deg, #f7d283 20%, #f2aa0e 90%)",
    borderRadius: 3,
    border: 0,
    height: 48,
    color: "black",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4d4d63"
  }
};

const UpdateButton = props => {
  console.log(props.style);
  const { classes } = props;

  return (
    <Button className={classes.root} onClick={props.action}>
      Update
    </Button>
  );
};

export default withStyles(styles)(UpdateButton);