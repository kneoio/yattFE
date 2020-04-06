import {combineReducers} from "redux";
import { taskReducer } from "./task/redusers"
import {loginReducer} from "./security/reducers";
import {getProfile} from "./userprofile/reducers";

export default combineReducers({
    security: loginReducer,
    profile: getProfile,
    tasks:  taskReducer,
    task: taskReducer

})