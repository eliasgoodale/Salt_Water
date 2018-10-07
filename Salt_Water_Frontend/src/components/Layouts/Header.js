import React from 'react'

import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Add } from '@material-ui/icons';
const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

export default ({ onClickCreate }) => {

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<IconButton  color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="headline" color="inherit" style={{flex: 1}} >
						User Database
          </Typography>
					<Button
						variant="fab"
						mini
						onClick={onClickCreate}
					>
						<Add />
					</Button>
			</Toolbar>
			</AppBar>
		</div>
	)
}
