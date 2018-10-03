import React, { Component, Fragment } from 'react'
import classNames from "classnames";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add'
import IconButton from "@material-ui/core/IconButton";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import UserForm from './UserForm';

const toolbarStyles = theme => ({
	root: {
		paddingRight: theme.spacing.unit
	},
	highlight:
		theme.palette.type === "light"
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85)
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark
			},
	spacer: {
		flex: "1 1 100%"
	},
	actions: {
		color: theme.palette.text.secondary
	},
	title: {
		flex: "0 0 auto"
	}
});



class UserToolbar extends Component {

	constructor(props) {
		super(props)
		this.state = {
			editFormOpen: false,
			createFormOpen: false,
		}
		this.toggleCreateForm = this.toggleCreateForm.bind(this);
		this.toggleEditForm = this.toggleEditForm.bind(this);
	}

	toggleEditForm = () => {
		let {editFormOpen} = this.state;
		this.setState({
			editFormOpen: !editFormOpen
		});
	};

	toggleCreateForm = () => {
		let { createFormOpen } = this.state;
		this.setState({
			createFormOpen: !createFormOpen
		});
	};

	render() {
		const { numSelected, blankData, createUser, updateUser, formIsValid, selectedUser, deleteAction } = this.props;

		//console.log(createUser);
		const { createFormOpen, editFormOpen} = this.state;
		return (
			<Fragment>
			<UserForm
				open={createFormOpen && !editFormOpen}
				close={this.toggleCreateForm}
				formData={blankData}
				submit={createUser}
				formIsValid={formIsValid}
				buttonTitle={"Create"}

			/>
			<UserForm
					open={!createFormOpen && editFormOpen}
					close={this.toggleEditForm}
					formData={selectedUser}
					submit={updateUser}
					formIsValid={formIsValid}
					buttonTitle={"Update"}
				/>
			
				<Toolbar
					className={classNames(toolbarStyles.root, {
						[toolbarStyles.highlight]: numSelected > 0
					})}
				>
					<div className={toolbarStyles.title}>
						{numSelected > 0 ? (
							<Typography color="inherit" variant="subheading">
								{numSelected} selected
              </Typography>
						) : (
								<Typography variant="title" id="tableTitle">
									Users
              </Typography>
							)}
					</div>
					<div className={toolbarStyles.spacer} />
					<div className={toolbarStyles.actions}>
						{numSelected === 1 ? (
							<Tooltip title="Edit">
								<IconButton aria-label="Edit" onClick={this.toggleEditForm}>
									<EditIcon />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<div className={toolbarStyles.actions}>
						{numSelected > 0 ? (
							<Tooltip title="Delete">
								<IconButton aria-label="Delete" onClick={deleteAction}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<div className={toolbarStyles.actions}>
							<Tooltip title="Add">
								<IconButton aria-label="Add" onClick={this.toggleCreateForm}>
									<AddIcon />
								</IconButton>
							</Tooltip>
					</div>
				</Toolbar>
			</Fragment>
		)
	}
}

export default withStyles(toolbarStyles)(UserToolbar);
