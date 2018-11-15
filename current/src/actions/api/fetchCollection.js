import { FETCH_USERS, FETCH_TODOS, FETCH_COMMENTS } from '../../constants'
import httpClient from '../../httpClient'


const { comments, 
        users, 
        todos } = httpClient.endpoints;

export const fetchUsers = () => ({
    type: FETCH_USERS,
    payload: users.getAll(),
    meta: {table: 'users', COLLECTION: 'USERS'}
})

export const  fetchTodos = () => ({
    type: FETCH_TODOS,
    payload: todos.getAll(), 
    meta: {table: 'todos', COLLECTION: 'TODOS'}
})

export const fetchComments = () => ({
        type: FETCH_COMMENTS,
        payload: comments.getAll(), 
        meta: {table: 'comments', COLLECTION: 'COMMENTS'}
})
