import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserTable from './userTable.js'
import CrudButtons from './userButtons.js'




class App extends Component {
  render() {
    return (
      <div>
      <UserTable/>

      <CrudButtons/>
      </div>
    );
  }
}

export default App;
