import React, { Component, Fragment } from 'react';
import Header from './Layout/Header'; 
import './App.css';
import UserTable from './userTable.js';




class App extends Component {
	render() {
		return (
			<Fragment>
			<Header/>
			<UserTable/>

			</Fragment>
		);
	}
}

export default App;
