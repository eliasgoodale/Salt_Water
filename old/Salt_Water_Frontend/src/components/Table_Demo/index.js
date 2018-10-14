import React, { Fragment } from 'react'
import { Grid, Paper, Typography, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Form from './Form'
import UserTableDemo from '../Table_Demo/UserTableDemo'

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		margin: 10,
	},
	body: {
		fontSize: 16,
		margin: 10,
	},
}))(TableCell);

const styles = theme => ({
	paper: {
		padding: theme.spacing.unit * 3,
		overflowY: 'auto',
		[theme.breakpoints.up('sm')]: {
			marginTop: 5,
			height: 'calc(100% - 10px)'
		},
		[theme.breakpoints.down('xs')]: {
			height: '100%'
		}
	},
	table: {
		minWidth: 100,
		maxWidth: 300,
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	'@global': {
	},
	container: {
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px - 48px)'
		},
		[theme.breakpoints.down('xs')]: {
			height: 'calc(100% - 56px - 48px)'
		}
	},
})

export default withStyles(styles)( ({
	users, onSelect, onDelete, selectedUser, editMode, onEdit, onSelectEdit, onCreate,
	selectedUser: {
		listid = -1,
	} }) => {
	return (
		<Grid container direction='column'>
			<Grid item lg>
				<Paper style={classes.paper}>
						<Table className={classes.table} style={{ tableLayout: 'auto' }}>
						
							<TableHead>
								<TableRow>
									<CustomTableCell className={classes.head} padding='dense'>First Name</CustomTableCell>
									<CustomTableCell className={classes.head} padding='dense'>Last Name</CustomTableCell>
									<CustomTableCell className={classes.head} padding='dense'>Username</CustomTableCell>
									<CustomTableCell className={classes.head} padding='dense'>Password</CustomTableCell>
									<CustomTableCell className={classes.head} padding='checkbox'>Active</CustomTableCell>
									<CustomTableCell className={classes.head} padding='checkbox'>List Admin</CustomTableCell>
									<CustomTableCell className={classes.head} padding='checkbox'>User Admin</CustomTableCell>
									<CustomTableCell className={classes.head} padding='checkbox'>Entry Admin</CustomTableCell>
									<CustomTableCell className={classes.head} padding='checkbox'>Location Manager</CustomTableCell>
									<CustomTableCell className={classes.head} padding='checkbox'>Operator Admin</CustomTableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{users.map(u => {
									return (
										<TableRow key={u.listid} className={classNames(classes.row, {
											[classes.highlight]: u.listid === selectedUser.listid})}>
											<CustomTableCell className={classes.body} padding="dense">{u.firstName}</CustomTableCell>
											<CustomTableCell className={classes.body} padding="dense">{u.lastName}</CustomTableCell>
											<CustomTableCell className={classes.body} padding="dense">{u.username}</CustomTableCell>
											<CustomTableCell className={classes.body} padding="dense">{u.password}</CustomTableCell>
											<CustomTableCell className={classes.body} padding="checkbox">
												<Checkbox checked={row.isActive} />
											</CustomTableCell>
											<CustomTableCell className={classes.body} padding="checkbox">
												<Checkbox checked={row.isListAdmin} />
											</CustomTableCell>
											<CustomTableCell className={classes.body} padding="checkbox">
												<Checkbox checked={row.isUserAdmin} />
											</CustomTableCell>
											<CustomTableCell className={classes.body} padding="checkbox">
												<Checkbox checked={row.isEntryAdmin} />
											</CustomTableCell>
											<CustomTableCell className={classes.body} padding="checkbox">
												<Checkbox checked={row.isLocationManager} />
											</CustomTableCell>
											<CustomTableCell className={classes.body} padding="checkbox">
												<Checkbox checked={row.isOperatorAdmin} />
											</CustomTableCell>
										</TableRow>
									);
								})}
							</TableBody>

						</Table>
					</Paper>
				</Grid>
				
				<Grid item lg>
					<Paper className={classes.paper}>
					<Fragment>
						<Typography
							variant="title"
						>
							{editMode ? "Edit User" : "Create User"}
						</Typography>
						<Form
							key={listid}
							onSubmit={editMode ? onEdit : onCreate}
							user={listid == -1 ? null : selectedUser}
						/>
					</Fragment>
				</Paper>
			</Grid>
		</Grid>
	)
}
)