

export function counter(currentState=0, action) {
    switch(action.type){
        case 'INCREMENT':
            return currentState + 1 
        case 'DECREMENT':
            return currentState - 1 
        default:
            return currentState
    }
}

const gridIndexState = ['users', 'todos']
export function gridIndex(currentState=gridIndexState, action) {
    switch(action.type) {
        default:
            return currentState
    }
}


export const inspector = (state={ textFields: [], selected: {} }, action) => {
    console.log(action)
    switch(action.type) {
        case 'SELECT_GRID_ITEM':
            return { ...state, selected: action.payload }
        default:
            return state
    }
}


