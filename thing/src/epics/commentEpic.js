import  Observable  from 'rxjs'

import { fetchCommentList } from '../actions'

import { ofType } from 'redux-observable'
import { mergeMap, map, mapTo, filter} from 'rxjs/operators'
import { pipe } from 'rxjs'

// const FETCH_COMMENT = 'FETCH_COMMENT'

// const fetchCommentSuccess = () => ({
//     type: "FETCH_COMMENT_SUCCESS",
//     payload: data
// })

// const fetchCommentError = () => ({
//     type: 'FETCH_COMMENT_ERROR',
//     payload: error
// })

// const fetchComment = (state) => {
//     const id = state.fetchId
//     return Observable.of(instance.get(`/comments/${id}`));
// }
// const getItemsSorted = (ids: any) => {
//     getItems(ids).subscribe((res: any) => {
//         responseData.push(res.data)
//         responseData.sort((a: any, b: any) => {
//             const aIndex = ids.findIndex(id => id === a.id);
//             const bIndex = ids.findIndex(id => id === b.id);
//             return aIndex - bIndex;
//         })
//     })
// }

export default (action$, store) => action$.pipe(
    ofType('FETCH_LIST'),
    mergeMap(({ payload }) => payload.pipe(
        map(response => ({
            type: 'FETCH_COMMENTS_FULFILLED',
            payload: response.data,
            meta: {COLLECTION: 'COMMENTS'}
        })
    )))
)
