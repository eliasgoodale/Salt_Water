import { FETCH_USER, FETCH_TODO, FETCH_COMMENT } from '../../constants'
import httpClient from '../../httpClient'

const { users,
        todos,
        comments } = httpClient.endpoints



export const fetchUser = (id) => ({
    type: FETCH_USER,
    payload: users.getOne({ id: id }),
    meta: { 
        id: id, 
        table: 'users',
        ITEM: 'USER' 
    }
});

export const  fetchTodo = (id) => ({
    type: FETCH_TODO,
    payload: todos.getOne({ id: id }),
    meta: { 
        id: id, 
        table: 'todos',
        ITEM: 'TODO' 
    }
});

export const fetchComment = (id) => ({
        type: FETCH_COMMENT,
        payload: comments.getOne({id: id}),
        meta: { 
            id: id, 
            table: 'comments',
            ITEM: 'COMMENT' 
        }
});