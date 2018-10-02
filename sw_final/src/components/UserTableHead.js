import React, { Component } from 'react'
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
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
			order,
			orderBy,
		} = this.props;

		return (
			<TableHead>
				<TableRow>
					<TableCell padding="checkbox">
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
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
};