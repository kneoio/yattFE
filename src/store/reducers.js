import {combineReducers} from "redux";
import { taskReducer } from "./task/redusers"

export default combineReducers({
    tasks:  taskReducer
})