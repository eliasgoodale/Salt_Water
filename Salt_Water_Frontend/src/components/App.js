import React, {Component, Fragment} from 'react'
import { Header, Footer }  from './Layouts'
import Users from './Users'
import jsonpatch from 'fast-json-patch';

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5500/users' : 'production-url' 

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			users: [],
			selectedUser: {},
			maxIndex: -1,
			editMode: false,
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
		this.setState({
			users: data,
			maxIndex: listid,
		})
	}

	postUser = async(user) => {
		//user.id = "43987520349utoafoh"
		console.table(user);
		const settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		}
		//const res = await fetch(API_URL, settings)
		//const json = await res.text();
		//console.log(json);

	}

	patchUser = async (targetUser, updateUser) => {
		var diff = jsonpatch.compare(targetUser, updateUser)
		console.log(diff)
		const settings = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(diff),
		}
		//const res = await fetch(API_URL, settings)
		//const json = await res.json()
		//console.log(json);
	}


	handleUserSelect = (listid) => {
		//console.log(`selected: ${listid}`)
		this.setState(({ users }) => ({
			selectedUser: users.find(u => u.listid === listid)
		}))
	}

	handleUserCreate = user => {
		console.log(user)
		this.postUser(user)
		user.listid = this.state.maxIndex + 1
		this.setState( ({ users, maxIndex }) => ({
			users: [...users, user],
			maxIndex: ++maxIndex,
		}));
	}

	handleUserDelete = listid => 
		this.setState(({ users, selectedUser, editMode }) => ({
			selectedUser: selectedUser.listid === listid ? {} : selectedUser,
			editMode: selectedUser.listid === listid ? false : editMode,
			users: users.filter(u => u.listid !== listid),
		}));

	handleUserSelectEdit = listid => 
		this.setState( ({ users }) => ({
			editMode: true,
			selectedUser: users.find(u => u.listid === listid)
		}))


	handleUserEdit = user => {
		
		const targetUser = this.state.users.find(u => u.listid === user.listid)
		this.patchUser(targetUser, user)
		this.setState(({ users }) => ({
			users: [ 
				...users.filter(u => u.listid !== user.listid),
				user,
			],
			selectedUser: user,
		}) )
	}

	disableEditMode = () => 
		this.setState({
			editMode: false,
			selectedUser: {},
		})

	render(){
		const { users, selectedUser, editMode } = this.state
		//console.log(this.state);
		return ( 
		<Fragment>
			<Header
				onUserCreate={this.handleUserCreate}
				onClickCreate={this.disableEditMode}
			/>
			<Users
				onDelete={this.handleUserDelete}
				selectedUser={selectedUser}
				users={users}
				//onSelect={this.handleUserSelect}
				onSelectEdit={this.handleUserSelectEdit}
				onEdit={this.handleUserEdit}
				editMode={editMode}
				onCreate={this.handleUserCreate}
				/>
			<Footer/>
		</Fragment>
		)
	}
}
