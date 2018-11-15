import httpClient from '../../httpClient'
// import { fetchUsers, fetchTodos, fetchComments} from './fetchCollection';
// import { fetchUserList, fetchTodoList, fetchCommentList } from './fetchList'

//     fetchUsers, fetchTodos, fetchComments,
//     fetchUserList, fetchTodoList, fetchCommentList,
// }

const { endpoints } = httpClient;

const GET_ALL = 'GET_ALL';

const GET_LIST = 'GET_LIST';

const GET_ONE = 'GET_ONE'

export const getAll = (collection) => ({
    type: GET_ALL,
    payload: endpoints[collection].getAll(),
    meta: {table: collection}
})

export const getList = (collection, ids) => ({
    type: GET_LIST,
    payload: endpoints[collection].getList(ids),
    meta: {table: collection}
})

export const getOne = (collection, id) => ({
    type: GET_ONE,
    payload: endpoints[collection].getOne({id: id}),
    meta: {table: collection}
})