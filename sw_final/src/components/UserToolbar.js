import React, { Component, Fragment } from 'react'
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from '@material-ui/icons/Add'
import IconButton from "@material-ui/core/IconButton";
import { lighten } from "@material-ui/core/styles/colorManipulator";

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
	render() {
		const { numSelected } = this.props
		return (
			<Fragment>
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
							<Tooltip title="Update">
								<IconButton aria-label="Update" onClick={this.props.openForm}>
									<UpdateIcon />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<div className={toolbarStyles.actions}>
						{numSelected > 0 ? (
							<Tooltip title="Delete">
								<IconButton aria-label="Delete" onClick={this.props.deleteAction}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<div className={toolbarStyles.actions}>
							<Tooltip title="Add">
								<IconButton aria-label="Add" onClick={this.props.openForm}>
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
