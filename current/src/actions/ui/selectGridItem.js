import {SELECT_GRID_ITEM} from '../../constants'

export const selectGridItem = (dataItem) => ({
    type: SELECT_GRID_ITEM,
    payload: dataItem,
})