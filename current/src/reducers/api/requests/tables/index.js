import validation from './validationsReducer';
import collection from './collectionsReducer';

const route = (actionType) => {
    return 'COLLECTION'
}
export const users = (state={}, action) => {
    switch(route(action.type)) {
        case 'COLLECTION':
            console.log('CALLED USERS')
            return { ...state, collection: collection(state.collection, action)}
        case 'VALIDATION':
            return { ...state, validation: validation(state.validation, action) }
        default:
            return state;
    }
}

export const todos = (state={}, action) => {
    switch(route(action.type)) {
        case 'COLLECTION':
            return {...state, validation: validation(state.validation, action) }
        case 'VALIDATION':
            return {...state, collection: collection(state.collection, action) }
        default:
            return state;
    }
}
export const comments = (state={}, action) => {
    switch(route(action.type)) {
        case 'COLLECTION':
            return {...state, validation: validation(state.validation, action) }
        case 'VALIDATION':
            return {...state, collection: collection(state.collection, action) }
        default:
            return state;
    }
}

export const haulers = (state={}, action) => {
    switch(route(action.type)) {
        case 'COLLECTION':
            return {...state, validation: validation(state.validation, action) }
        case 'VALIDATION':
            return {...state, collection: collection(state.collection, action) }
        default:
            return state;
    }
}