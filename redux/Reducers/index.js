import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";



export const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    error: errorReducer,
    post: postReducer
});