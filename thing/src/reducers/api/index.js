
import { combineReducers } from 'redux';
import tables from './requests'

function gridIndex(state=['users', 'todos', 'comments'], action) {
    switch(action.payload){
        default:
            return state;
    }
}



export default combineReducers({
    gridIndex,
    tables
})