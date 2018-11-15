import {comments, todos, users, haulers} from './tables'

const initialState = {
    comments : {
        grid: {
            index: ['id', 'name', 'email'],
            columnNames: {
                id: 'ID',
                name: 'Name',
                email: 'Email',
            }
        },
        validation: {
            fetching: false,
            fetched: false,
            fetchedList: [],
            validations: [],
            validEntries: {},
            invalidEntries: {},
        },
        collection: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        }
    },
    todos: {
        grid: {
            index: ['id', 'userId', 'completed'],
            columnNames: {
                id: 'ID',
                userId: 'User ID',
                completed: 'Completed',
            }
        },
        validation: {
            fetching: false,
            fetched: false,
            fetchedList: [],
            validations: [],
            validEntries: {},
            invalidEntries: {},
            
        },
        collection: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        }
    },
    users: {
        grid: {
            index: ['id', 'name', 'email'],
            columnNames: {
                id: 'ID',
                name: 'Name',
                email: 'Email',
            },
        },
        validation: {
            fetching: false,
            fetched: false,
            fetchedList: [],
            validations: [],
            validEntries: {},
            invalidEntries: {},
            
        },
        collection: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        }
    },
    haulers: {
        grid: {
            index: ['Id', 'Name', 'CreatedByName'],
            columnNames: {
                Id: 'ID',
                Name: 'Name',
                CreatedByName: 'Created By',
            },
        },
        validation: {
            fetching: false,
            fetched: false,
            validations: [],
            validEntries: {},
            invalidEntries: {},
            
        },
        collection: {
            data: [],
            fetching: false,
            fetched: false,
            error: null
        }
    },
}

const getTable = (action) => {
    if (action.type.includes('GET'))
        return action.meta.table
    else
        return "none"
}

export default (state=initialState, action) => {
    const table = getTable(action)
    switch(table) {
        case 'comments':
            return { ...state, comments: comments(state.comments, action) }
        case 'users':
            return {...state, users: users(state.users, action) }
        case 'todos': 
            return {...state, todos: todos(state.todos, action) }
        case 'haulers':
            return {...state, haulers: haulers(state.haulers, action) }
        default:
            return state;
    }
}
