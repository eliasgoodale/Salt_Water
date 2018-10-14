import React, { Fragment } from 'react'
import {
	Grid,
	Paper,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton
} from '@material-ui/core'

import { Delete } from '@material-ui/icons'

import Form from './Form'
import { withStyles } from '@material-ui/core/styles'




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
	'@global': {
		'html, body, #root': {
			height: '100%'
		}
	},
	container: {
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px - 48px)'
		},
		[theme.breakpoints.down('xs')]: {
			height: 'calc(100% - 56px - 48px)'
		}
	},
	item: {
		[theme.breakpoints.down('xs')]: {
			height: '50%'
		}
	}
})

export default withStyles(styles)(
	({
	users, onSelect, onDelete, selectedUser, editMode, onEdit, onSelectEdit, onCreate, classes,
	selectedUser: {
		listid = -1,
	}}) => {
	return (
		<Grid container>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper}>
						<List component="ul">
							{users.map(( {listid, firstName, lastName})  =>
							<ListItem
								key={listid}
								button
								divider
								onClick={() => onSelectEdit(listid)}
								>
								<ListItemText primary={[firstName, lastName].join(' ')}/>
									<ListItemSecondaryAction>
									{selectedUser.listid === listid ?
										<IconButton  style={{color: "#D50000"}} onClick={() => onDelete(listid)}>
											<Delete/>
										</IconButton>
										:null}
									</ListItemSecondaryAction>
								</ListItem>
							)}
					</List>
				</Paper>
			</Grid>
			<Grid item sm>
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
							user={listid == -1 ? null : selectedUser }
						/>
					</Fragment> 
					
				</Paper>
			</Grid>
		</Grid>
	)
})
