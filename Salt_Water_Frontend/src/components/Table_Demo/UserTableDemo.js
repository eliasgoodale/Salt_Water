import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import users from '../../store'
import Checkbox from '@material-ui/core/Checkbox'

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
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
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
});

let id = 0;
function createData(user) {
	id += 1;
	user.id = id
	return { ...user};
}


const rows = users.map(u => createData(u))

// const rows = [
// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// 	createData('Eclair', 262, 16.0, 24, 6.0),
// 	createData('Cupcake', 305, 3.7, 67, 4.3),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function CustomizedTable(props) {
	const { classes,  } = props;

	return (
	
		<Paper className={classes.root}>
			<Table className={classes.table} style={{ tableLayout: 'auto' }}>
				<TableHead>
					<TableRow>
						<CustomTableCell className={classes.head}padding='dense'>First Name</CustomTableCell>
						<CustomTableCell className={classes.head}padding='dense'>Last Name</CustomTableCell>
						<CustomTableCell className={classes.head}padding='dense'>Username</CustomTableCell>
						<CustomTableCell className={classes.head}padding='dense'>Password</CustomTableCell>
						<CustomTableCell className={classes.head}padding='checkbox'>Active</CustomTableCell>
						<CustomTableCell className={classes.head}padding='checkbox'>List Admin</CustomTableCell>
						<CustomTableCell className={classes.head}padding='checkbox'>User Admin</CustomTableCell>
						<CustomTableCell className={classes.head}padding='checkbox'>Entry Admin</CustomTableCell>
						<CustomTableCell className={classes.head}padding='checkbox'>Location Manager</CustomTableCell>
						<CustomTableCell className={classes.head}padding='checkbox'>Operator Admin</CustomTableCell>
		
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => {
						return (
							<TableRow className={classes.row} key={row.id} style={{width: 400}}>
								<CustomTableCell className={classes.body} padding="dense">{row.firstName}</CustomTableCell>
								<CustomTableCell className={classes.body} padding="dense">{row.lastName}</CustomTableCell>
								<CustomTableCell className={classes.body} padding="dense">{row.username}</CustomTableCell>
								<CustomTableCell className={classes.body} padding="dense">{row.password}</CustomTableCell>
								<CustomTableCell className={classes.body} padding="checkbox"> 
								<Checkbox checked={row.isActive}/>
								</CustomTableCell>
								<CustomTableCell className={classes.body} padding="checkbox"> 
								<Checkbox checked={row.isListAdmin}/>
								</CustomTableCell>
								<CustomTableCell className={classes.body} padding="checkbox"> 
								<Checkbox checked={row.isUserAdmin}/>
								</CustomTableCell>
								<CustomTableCell className={classes.body} padding="checkbox"> 
								<Checkbox checked={row.isEntryAdmin}/>
								</CustomTableCell>
								<CustomTableCell className={classes.body} padding="checkbox"> 
								<Checkbox checked={row.isLocationManager}/>
								</CustomTableCell>
								<CustomTableCell className={classes.body} padding="checkbox"> 
								<Checkbox checked={row.isOperatorAdmin}/>
								</CustomTableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

CustomizedTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);