import {
    ADD_TODOS,
    LOADING_TRUE,
    LOADING_FALSE
} from '../actionTypes';

export const setLoadingFalse = () => ({type: LOADING_FALSE})
export const setLoadingTrue = () => ({type: LOADING_TRUE})
export const addTodos = (payload) => ({type: ADD_TODOS, payload})
export const pushTodo = (payload) => ({type: LOADING_FALSE, payload})