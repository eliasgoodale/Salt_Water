
import { combineReducers } from 'redux';
import {tables} from './api'
import { inspector } from './ui'

function gridIndex(state=['users', 'todos', 'comments'], action) {
    switch(action.payload){
        default:
            return state;
    }
}

function ignoreLogger(state={}, action) {
    switch(action.type) {
        case "@@redux/INITx.o.k.2.3.o":
            return state;
        case "@@redux/PROBE_UNKNOWN_ACTIONb.5.m.e.c.w":
            return state;
        case "@@redux/INITx.o.k.2.3.o":
            return state;
        default:
            return state;
    }
}

export default combineReducers({

    gridIndex,
    tables,
    inspector,
})