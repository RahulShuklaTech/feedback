import {applyMiddleware, createStore} from "redux";
import {logger} from "redux-logger/src";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
const middleware = [thunk, logger];

export const store = createStore(userReducer, applyMiddleware(...middleware));