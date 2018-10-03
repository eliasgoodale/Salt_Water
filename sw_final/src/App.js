import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import UserToolbar from './components/UserToolbar';
import UserForm from './components/UserForm';
import UserTableHead from './components/UserTableHead';
import Joi from 'joi';
import DeleteUserAlert from './components/DeleteUserAlert'

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/users' : 'production-url'

const schema = Joi.object().keys({
	firstName: Joi.string()
		.regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/)
		.required(),
	lastName: Joi.string()
		.regex(/^[a-zA-ZÀ-ÿ -]{2,25}$/)
		.required(),
	username: Joi.string()
		.regex(/^[a-zA-ZÀ-ÿ-_]{4,50}$/)
		.required(),
	password: Joi.string()
		.min(6)
		.max(25)
		.required(),
	isActive: Joi.boolean().required(),
	isListAdmin: Joi.boolean().required(),
	isUserAdmin: Joi.boolean().required(),
	isEntryAdmin: Joi.boolean().required(),
	isLocationManager: Joi.boolean().required(),
	isOperatorAdmin: Joi.boolean().required()
});

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === "desc"
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 1020
	},
	tableWrapper: {
		overflowX: "auto"
	}
});

const blankData = {
	_id: "",
	firstName: "",
	lastName: "",
	username: "",
	password: "",
	isActive: false,
	isListAdmin: false,
	isUserAdmin: false,
	isEntryAdmin: false,
	isLocationManager: false,
	isOperatorAdmin: false,
}


class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			order: "asc",
			orderBy: "firstName",
			data: [],
			selected: [],
			alertOpen: false,
			showInactive: false,
			numSelected: 0,
			selectedUsers: [],
			page: 0,
			rowsPerPage: 5,
		}
		this.filterActive = this.filterActive.bind(this);
	}
	
	componentWillMount = (url = API_URL) => {
		fetch(url, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((responseJson) => {
				for (var i = 0; i < responseJson.length; i++) {
					responseJson[i].listid = i;
				}

				//console.log(responseJson);
				this.setState({
					data: responseJson
				})
			})
			.catch((error) => {
				console.error(error);
			});
	}

	toggleAlert = () => {
		this.setState({
			alertOpen: !this.state.alertOpen,
		})
	}

	formIsValid = () => {
		const { formData } = this.state
		const newUser = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			username: formData.username,
			password: formData.password,
			isActive: formData.isActive,
			isListAdmin: formData.isListAdmin,
			isUserAdmin: formData.isUserAdmin,
			isEntryAdmin: formData.isEntryAdmin,
			isLocationManager: formData.isLocationManager,
			isOperatorAdmin: formData.isOperatorAdmin
		};
		const result = Joi.validate(newUser, schema);
		//console.log(result);
		return result.error ? false : true;
	};

	updateUser = (updatedUser) => {
		console.log("UPDATE!!!!");
		let {data} = this.state;
		let targetUserIndex = data.findIndex(user => user._id === updatedUser._id);
		data[targetUserIndex] = updatedUser 
		this.setState({data: data})

		/*PUT*/
	}

	deleteSelected = () => {
		let { selectedUsers, data } = this.state;

		for (var i = 0; i < selectedUsers.length; i++) {
			let mark = data.find(searchUser => searchUser._id === selectedUsers[i]._id)
			mark["isActive"] = false;
			this.setState({
				...data,
				mark,
				alertOpen: false,
			}) 
		 }
		 /*Delete*/
	}
	createUser = (newUser) => {
		let {data} = this.state;
		data.unshift(newUser);
		console.log("CREATE!!!!");
		this.setState({
			data: data
		})
		/*Post*/
	};


	handleClick = (event, listid) => {
		event.preventDefault();
		const { selected, selectedUsers, data } = this.state;
		const selectedIndex = selected.indexOf(listid);
		const selectedUser = data.find(user => user.listid === listid);
		const selectedUserIndex = selectedUsers.indexOf(selectedUser);
		let newSelectedUsers = [];
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, listid);
			newSelectedUsers = newSelectedUsers.concat(selectedUsers, selectedUser);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
			newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
			newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
			newSelectedUsers = newSelectedUsers.concat(
				selectedUsers.slice(0, selectedUserIndex),
				selectedUsers.slice(selectedUserIndex + 1)
			);
		}

		this.setState({
			selected: newSelected,
			selectedUsers: newSelectedUsers,
			formData: newSelectedUsers.length === 1 ? newSelectedUsers[0] : blankData,
		});
	};

	filterActive = (dataSet) => {
		let filterData = [];
		for(let i = 0; i < dataSet.length;  i++) {
			if(dataSet[i].isActive === true)
				filterData.push(dataSet[i]);
		}
		return(filterData);
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	


	handleFormToggle = () => {
		//console.log("called")
		this.setState({
			formOpen: !this.state.formOpen,
		});
	};

	toggleShowInactive = () => {
		this.setState({
			showInactive: !this.state.showInactive,
		})
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = "desc";

		if (this.state.orderBy === property && this.state.order === "desc") {
			order = "asc";
		}

		this.setState({ order, orderBy });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;
	
	render() {
		const { formData, formOpen, showInactive, selectedUsers, alertOpen, data, order, orderBy, selected, rowsPerPage, page } = this.state;
		const emptyRows =
			rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

		const numSelected = selected.length;

		return (
	
			<Fragment>
			<DeleteUserAlert
				numSelected={numSelected}
				confirmAction={this.deleteSelected}
				open={alertOpen}
				close={this.toggleAlert}
			/> 
				<Paper className={styles.root}>
					<UserToolbar
						numSelected={selected.length}
						blankData={blankData}
						createUser={this.createUser}
						updateUser={this.updateUser}
						formIsValid={this.formIsValid}
						selectedUser = {selectedUsers[0]}
						deleteAction={this.toggleAlert}
					/>
					<div className={styles.tableWrapper}>
						<Table className={styles.table} aria-labelledby="tableTitle">
							<UserTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={this.handleSelectAllClick}
								onRequestSort={this.handleRequestSort}
								rowCount={data.length}
							/>
							<TableBody>
								{stableSort( showInactive === false ? this.filterActive(data) : data, getSorting(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(n => {
										const isSelected = this.isSelected(n.listid);
										return (
											<TableRow
												hover
												onClick={event => this.handleClick(event, n.listid)}
												role="checkbox"
												aria-checked={isSelected}
												tabIndex={-1}
												key={n.listid}
												selected={isSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox checked={isSelected} />
												</TableCell>
												<TableCell component="th" scope="row" padding="none">
													{n.firstName}
												</TableCell>
												<TableCell string>{n.lastName}</TableCell>
												<TableCell string>{n.username}</TableCell>
												<TableCell string>{n.password}</TableCell>
												<TableCell padding="checkbox">
													<Checkbox checked={n.isActive === true} />
												</TableCell>
												<TableCell padding="checkbox">
													<Checkbox checked={n.isListAdmin === true} />
												</TableCell>
												<TableCell padding="checkbox">
													<Checkbox checked={n.isUserAdmin === true} />
												</TableCell>
												<TableCell padding="checkbox">
													<Checkbox checked={n.isEntryAdmin === true} />
												</TableCell>
												<TableCell padding="checkbox">
													<Checkbox checked={n.isLocationManager === true} />
												</TableCell>
												<TableCell padding="checkbox">
													<Checkbox checked={n.isOperatorAdmin === true} />
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: 49 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<TablePagination
						component="div"
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						backIconButtonProps={{
							'aria-label': 'Previous Page',
						}}
						nextIconButtonProps={{
							'aria-label': 'Next Page',
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
					/>
				</Paper>
				<Button onClick={this.toggleShowInactive} color="primary" autoFocus>
					Show Inactive
            </Button>
			</Fragment>
		);
	}
}

export default App;
