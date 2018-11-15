export default (state={}, action) => {
    switch (action.type) {
        case `GET_ONE_PENDING`:
            return { ...state, fetching: true, }
        case `GET_ONE_FULFILLED`:
            return { 
                ...state, 
                fetching: null, 
                data: [
                    ...state.data,
                    action.payload
                ]
            }
        case `GET_ONE_REJECTED`:
            return { 
                ...state, 
                fetching: null, 
                invalidEntries: {
                    ...state.invalidEntries,
                    id: action.payload
                }
            }
    }
}
