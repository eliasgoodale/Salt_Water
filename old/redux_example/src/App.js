import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

import UserList from './components/UserList';
import UserForm from './components/UserForm';


class App extends Component {


	render() {

		return (
			<Provider store={store}>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Welcome to React</h1>
					</header>
				<UserForm  />
				<UserList  />
				</div>
			</Provider>
		);
	}
}

export default App;
