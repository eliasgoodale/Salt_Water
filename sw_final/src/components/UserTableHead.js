import React, { Component } from 'react'
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";



const rows = [
	{ id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
	{ id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
	{ id: 'username', numeric: false, disablePadding: true, label: 'Username' },
	{ id: 'password', numeric: false, disablePadding: true, label: 'Password' },
	{ id: 'isActive', numeric: false, disablePadding: true, label: 'Active' },
	{ id: 'isListAdmin', numeric: false, disablePadding: true, label: 'ListAdmin' },
	{ id: 'isUserAdmin', numeric: false, disablePadding: true, label: 'User Admin' },
	{ id: 'isEntryAdmin', numeric: false, disablePadding: true, label: 'Entry Admin' },
	{ id: 'isLocationManager', numeric: false, disablePadding: true, label: 'Location Manager' },
	{ id: 'isOperatorAdmin', numeric: false, disablePadding: true, label: 'OperatorAdmin' },
];


export default class UserTableHead extends Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const {
			onSelectAllClick,
			order,
			orderBy,
			numSelected,
			rowCount
		} = this.props;

		return (
			<TableHead>
				<TableRow>
					<TableCell padding="checkbox">
						{/* <Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={numSelected === rowCount}
							onChange={onSelectAllClick}
						/> */}
					</TableCell>
					{rows.map(row => {
						return (
							<TableCell
								key={row.id}
								numeric={row.numeric}
								padding={row.disablePadding ? "none" : "default"}
								sortDirection={orderBy === row.id ? order : false}
							>
								<Tooltip
									title="Sort"
									placement={row.numeric ? "bottom-end" : "bottom-start"}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === row.id}
										direction={order}
										onClick={this.createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						);
					}, this)}
				</TableRow>
			</TableHead>
		);
	}
}

UserTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};