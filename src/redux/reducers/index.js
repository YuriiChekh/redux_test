import {combineReducers} from "redux";
import {todosReducer} from "./todos";
import {counterReducer} from "./counter";

export const rootReducer = combineReducers({
    todosReducer,
    counterReducer
})