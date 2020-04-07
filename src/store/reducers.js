import {combineReducers} from "redux";
import { tasksReducer } from "./tasks/reducers"
import {loginReducer} from "./security/reducers";
import {getProfile} from "./userprofile/reducers";
import {taskReducer} from "./task/reducers";

export default combineReducers({
    security: loginReducer,
    profile: getProfile,
    tasks:  tasksReducer,
    task: taskReducer

})