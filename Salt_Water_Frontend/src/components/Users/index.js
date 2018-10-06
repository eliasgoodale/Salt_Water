import React, {Fragment} from 'react'
import {Grid, Paper, Typography, IconButton } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Edit, Delete} from '@material-ui/icons'
import ListItemSecondaryAction from '@material-ui/core/List'
import Form from './Form'

const styles = {
	Paper: {
		padding: 20,
		marginTop: 10,
		marginBotton: 10,
		height: 500,
		overflowY: 'auto'
	}


	
}

export default ( {
	users, onSelect, onDelete, selectedUser, editMode, onEdit, onSelectEdit,
	selectedUser: {
		firstName,
		lastName,
		username,
		password,
		isActive,
		isListAdmin,
		isUserAdmin,
		isEntryAdmin,
		isLocationManager,
		isOperatorAdmin,
	}}) => {
	return (
		<Grid container>
		{console.log(editMode)}
			<Grid item xs={12} sm={6}>
				<Paper style={styles.Paper}>
		
						<List component="ul">
							{users.map( ({listid, firstName, lastName})  =>
							<Fragment key={listid}>
								<ListItem
									key={listid}
									button
									divider
								>
									<ListItemText 
										primary={[firstName, lastName].join(' ')}
										onClick={() => onSelectEdit(listid)}
										/>
									<ListItemSecondaryAction>
										<IconButton onClick={() => onDelete(listid)}>
											<Delete />
										</IconButton>
									</ListItemSecondaryAction>

								</ListItem>

							</Fragment>
					)}
					</List>
				</Paper>
			</Grid>
			<Grid item sm>
				<Paper style={styles.Paper}>
				{editMode ?
				<Form
					onSubmit={onEdit}
					user={selectedUser}
				/> :
				<Fragment>
					<Typography
						variant="display1"
					>
						Welcome!
				</Typography>
					<Typography
						variant="subheading"
						style={{ marginTop: 20 }}
					>
						Please select a user to edit, or add a new user.
				</Typography>
				</Fragment>}
					
				</Paper>
			</Grid>
		</Grid>
	)
}
