import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'; 
import AppBar from '@material-ui/core/AppBar';
import UserEntry from '../Components/UserEntry';


export default class Header extends React.Component {
	
	render() {
		return(
			<AppBar position="static">
				<Toolbar>
					<Typography variant="headline" color="inherit" style={{flex: 0}}>
					</Typography>
					<UserEntry 
						schema = {this.props.schema}
						postUrl = {this.props.apiUrl}
					/>
				</Toolbar>
			</AppBar>
		);
	}
}