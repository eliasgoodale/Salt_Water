import {comments, todos, users} from './tables'



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
    }
}

const getTable = (actionType) => {
    if (actionType.includes('COMMENT'))
        return 'comments';
    else if (actionType.includes('TODO'))
        return 'todos';
    else if (actionType.includes('USER'))
        return 'users';
    return actionType
}

export default (state=initialState, action) => {
    const table = getTable(action.type)
    switch(table) {
        case 'comments':
            return { ...state, comments: comments(state.comments, action) }
        case 'users':
            return {...state, users: users(state.users, action) }
        case 'todos': 
            return {...state, todos: todos(state.todos, action) }
        default:
            return state;
    }
}