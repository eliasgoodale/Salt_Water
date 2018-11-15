import httpClient from '../../httpClient'
import { FETCH_USERS_LIST,
    FETCH_TODOS_LIST,
    FETCH_COMMENTS_LIST, } from '../../constants';


const {
    users, todos, comments
} = httpClient.endpoints


export const fetchUserList = (ids=[]) => ({
    type: FETCH_USERS_LIST,
    payload: users.getList(ids)
});

export const fetchTodoList = (ids=[]) => ({
    type: FETCH_TODOS_LIST,
    payload: todos.getList(ids)
});

export const fetchCommentList = (ids=[]) => ({
    type: FETCH_COMMENTS_LIST,
    payload: comments.getList(ids)
});

