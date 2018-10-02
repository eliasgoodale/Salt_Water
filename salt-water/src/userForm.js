import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Joi from "joi";

const styles = theme => ({
  container: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 500
  }
});

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/users"
    : "production-url-here";

const schema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/)
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/)
    .required(),
  username: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿ-_]{4,50}$/)
    .required(),
  password: Joi.string()
    .min(6)
    .max(25)
    .required(),
  isActive: Joi.boolean().required(),
  isListAdmin: Joi.boolean().required(),
  isUserAdmin: Joi.boolean().required(),
  isEntryAdmin: Joi.boolean().required(),
  isLocationManager: Joi.boolean().required(),
  isOperatorAdmin: Joi.boolean().required()
});

class CreateUserForm extends React.Component {
  state = {
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
    checked: [],
    sendingForm: false,
    sentForm: false
  };

  handleCheckboxToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
      switch (value) {
        case 0:
          this.setState({ isActive: true });
          break;
        case 1:
          this.setState({ isListAdmin: true });
          break;
        case 2:
          this.setState({ isUserAdmin: true });
          break;
        case 3:
          this.setState({ isEntryAdmin: true });
          break;
        case 4:
          this.setState({ isLocationManager: true });
          break;
        case 5:
          this.setState({ isOperatorAdmin: true });
          break;
        default:
          break;
      }
    } else {
      newChecked.splice(currentIndex, 1);
      switch (value) {
        case 0:
          this.setState({ isActive: false });
          break;
        case 1:
          this.setState({ isListAdmin: false });
          break;
        case 2:
          this.setState({ isUserAdmin: false });
          break;
        case 3:
          this.setState({ isEntryAdmin: false });
          break;
        case 4:
          this.setState({ isLocationManager: false });
          break;
        case 5:
          this.setState({ isOperatorAdmin: false });
          break;
        default:
          break;
      }
    }

    this.setState({
      checked: newChecked
    });
    console.log(this.state);
  };

  handleInput = name => event => {
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state);
  };

  formIsValid = () => {
    const newUser = {
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
    };
    const result = Joi.validate(newUser, schema);
    console.log(result);
    return result.error ? false : true;
  };

  formSubmitted = event => {
    event.preventDefault();

    if (this.formIsValid()) {
      this.setState({
        sendingForm: true
      });
      fetch(API_URL, {
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
      })
        .then(res => res.json())
        .then(message => {
          console.log(message);
          setTimeout(() => {
            this.setState({
              sendingForm: false,
              sentForm: true
            });
          }, 1000);
        });
    }
  };
  render() {
    const { classes, } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="First Name"
          className={classes.textField}
          value={this.state.firstName}
          onChange={this.handleInput("firstName")}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Last Name"
          className={classes.textField}
          value={this.state.lastName}
          onChange={this.handleInput("lastName")}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Username"
          className={classes.textField}
          value={this.state.username}
          onChange={this.handleInput("username")}
          margin="normal"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          value={this.state.password}
          onChange={this.handleInput("password")}
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
            className={classes.listItem}
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
            className={classes.listItem}
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
            className={classes.listItem}
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
            className={classes.listItem}
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
            className={classes.listItem}
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
            className={classes.listItem}
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
          className={classes.button}
          type="submit"
          disabled={!this.formIsValid()}
        >
          Create User
        </Button>
      </form>
    );
  }
}

CreateUserForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateUserForm);
