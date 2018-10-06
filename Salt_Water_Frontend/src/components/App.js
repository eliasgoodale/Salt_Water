import React, {Component, Fragment} from 'react'
import { Header, Footer }  from './Layouts'
import Users from './Users'

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/users' : 'production-url' 

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			users: [],
			selectedUser: {},
			maxIndex: -1,
		}
		this.getUsers = this.getUsers.bind(this);
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers = async() => {
		let res = await fetch(API_URL)
		let data = await res.json()
		let listid = this.state.maxIndex
		data = data.map(user => user = { ...user, listid: ++listid })
		console.log(data);
		this.setState({
			users: data,
			maxIndex: listid,
		})
	}


	handleUserSelect = (listid) => {
		console.log(`selected: ${listid}`)
		this.setState(({ users }) => ({
			selectedUser: users.find(u => u.listid === listid)
		}))
	}

	handleUserCreate = user => {
		user.listid = this.state.maxIndex + 1
		this.setState( ({ users, maxIndex }) => ({
			users: [...users, user],
			maxIndex: ++maxIndex,
		}));
	}

	handleUserDelete = listid => {
		console.log(this.state.selectedUser)
		this.setState(({ users, selectedUser }) => ({
			selectedUser: selectedUser.listid === listid ? {} : selectedUser,
			users: users.filter(u => u.listid !== listid),
		}));
	}

	handleUserSelectEdit = listid => {
		this.setState( ({ users}) => ({
			editMode: true,
			selectedUser: users.find(u => u.listid === listid)
		}))
	}

	handleUserEdit = user => {
		this.setState(({ users }) => ({
			users: [ 
				...users.filter(u => u.listid !== user.listid),
				user,
			],
			selectedUser: user,
		}) )
	}

	render(){
		const { users, selectedUser, editMode } = this.state
		console.log(this.state);
		return ( 
		<Fragment>
			<Header
				onUserCreate={this.handleUserCreate}
			/>
			<Users
				onDelete={this.handleUserDelete}
				selectedUser={selectedUser}
				users={users}
				onSelect={this.handleUserSelect}
				onSelectEdit={this.handleUserSelectEdit}
				onEdit={this.handleUserEdit}
				editMode={editMode}
				
				/>
			<Footer/>
		</Fragment>
		)
	}
}
