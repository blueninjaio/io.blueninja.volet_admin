import { createStore, combineReducers, applyMiddleware } from "redux";
import login from "../reducers/loginState";

import thunk from "redux-thunk";

/**
|--------------------------------------------------
| sets initial state of store
|--------------------------------------------------
*/
const initial = {};

/**
|--------------------------------------------------
| the root reducer of store
|--------------------------------------------------
*/
const rootReducer = combineReducers({ login: login });

/**
|--------------------------------------------------
| store creation which contains the rootReducer, the initial state and a middleware
|--------------------------------------------------
*/
export const store = createStore(rootReducer, initial, applyMiddleware(thunk));
