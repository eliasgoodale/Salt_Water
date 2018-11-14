
export default (state={}, action) => {
    const { COLLECTION } = action.meta
    switch (action.type) {
        case `FETCH_${COLLECTION}_PENDING`:
            return { ...state, fetching: true }
        case `FETCH_${COLLECTION}_FULFILLED`:
            const { data } = state;
            if (typeof action.payload === 'object')
                data.push(action.payload)
            else
                data = action.payload.data
            return { 
                ...state, 
                fetching: false, 
                fetched: true,
                data: data
            }
        case `FETCH_${COLLECTION}_REJECTED`:
            return { 
                ...state, 
                fetching: false, 
                error: action.payload 
            }
        default:
            return state
    }
}

