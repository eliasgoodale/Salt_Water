export default (state={}, action) => {
    const { id, ITEM } = action.meta
    console.log(ITEM)
    switch (action.type) {
        case `FETCH_${ITEM}_PENDING`:
            return { ...state, fetching: id }
        case `FETCH_${ITEM}_FULFILLED`:
            return { 
                ...state, 
                fetching: null, 
                fetchedList: [
                    ...state.fetchedList,
                    action.payload
                ]
            }
        case `FETCH_${ITEM}_REJECTED`:
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
