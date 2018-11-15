
export default (state={}, action) => {
    const { COLLECTION } = action.meta
    console.log("COLLECTIONS CALLED!!!!!!!!!")
    switch (action.type) {
        case `GET_ALL_PENDING`:
            return { ...state, fetching: true }
        case `GET_ALL_FULFILLED`:
            return { 
                ...state, 
                fetching: false, 
                fetched: true,
                data: action.payload.data
            }
        case `GET_ALL_REJECTED`:
            return { 
                ...state, 
                fetching: false, 
                error: action.payload 
            }
        default:
            return state
    }
}

