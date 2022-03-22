import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { user_reducer, swiper_reducer, creat_reducer } from "./reducer";
const reducer = combineReducers({ user_reducer, swiper_reducer, creat_reducer });
export const store = createStore(reducer, applyMiddleware(thunk));
