import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { LiquidTraceGrid as Grid } from './components'
import { GridColumn as Column } from '@progress/kendo-react-grid'
import { connect } from 'react-redux'
import { gridsMeta } from './dataHeaders'
import { bindActionCreators } from 'redux';
import { GridBar } from './components/grid-bar'
import { getAll, getOne, getList} from './actions/api'
import { selectGridItem } from './actions/ui'





class App extends Component {

  componentDidMount() {
    
  }
  rowClick = (e) => {
    console.log(e);
  };
  render() {
    const { fetchUsers, fetchTodos, gridIndex, fetchComments, selectGridItem} = this.props
    const grids = gridIndex.map((gridKey) => {
      const { grid, collection } = this.props[gridKey]
      return <Grid 
              id={gridKey} 
              header={grid} 
              data={collection.data} 
              style={{ width: 50}}
              onRowClick={selectGridItem}/>
    })
    return (
      <React.Fragment>
      <GridBar grids={grids}/>

      <button onClick={fetchUsers}>
        Get Users
      </button>
      <button  onClick={fetchTodos}>
        Get Todos
      </button>
      <button  onClick={fetchComments}>
        Get Comments
      </button>
      
  </React.Fragment>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.tables.todos,
    users: state.tables.users,
    comments: state.tables.comments,
    gridIndex: state.gridIndex,
  }
}

const  mapDispatchToProps = (dispatch) => {
  return {
    getAll: () => {dispatch(getAll())},
    selectGridItem: (e) => {dispatch(selectGridItem(e.dataItem))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
