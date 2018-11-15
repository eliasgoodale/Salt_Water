import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "@progress/kendo-theme-default/dist/all.css"
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import axios from 'axios';
import 'rxjs'


import httpClient from './httpClient'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import commentEpic from './epics/commentEpic'
import { createEpicMiddleware } from 'redux-observable'


import {getOne, getAll, getList} from './actions/api';

import { interval } from 'rxjs'
const epicMiddleWare = createEpicMiddleware();
const store = createStore(
        rootReducer, applyMiddleware(logger, thunk, promise(), epicMiddleWare)
);
epicMiddleWare.run(commentEpic);
render(
<Provider store={store}>
<App/>
</Provider>, document.getElementById('root')
);


// interval(500).subscribe(
//     val => store.dispatch(fetchComment(val)),
//     err => console.err(err),
//     () => console.log('complete'))

// interval(200).subscribe(
//     val => store.dispatch(fetchUser(val)),
//     err => console.err(err),
//     () => console.log('complete'))

// interval(1000).subscribe(
//     val => store.dispatch(fetchTodo(val)),
//     err => console.err(err),
//     () => console.log('complete'))

const fetchList = () => ({
    type: 'FETCH_LIST',
    payload: httpClient.endpoints.comments.getList([1,2,3,4,5,6,7,8]),
   
})


// fetchList.payload.subscribe((val) => console.log(val))



store.dispatch(getList('todos', [7, 4,5,6]));
// store.dispatch(fetchUsers())

// store.dispatch(fetchTodo(6))
// store.dispatch(fetchTodos())


// store.dispatch((dispatch) => {
//     dispatch({type: 'FETCH_USERS_PENDING'})
//     instance.get('/users')
//         .then((response) => {
//             dispatch({type: 'FETCH_USERS_FULFILLED', payload: response.data})
//         })
//         .catch( (err) => {
//             dispatch({type: "FETCH_USERS_REJECTED", payload: err})
//         })
// })
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
