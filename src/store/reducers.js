import {combineReducers} from "redux";
import { tasksReducer } from "./tasks/reducers"
import {loginReducer} from "./security/reducers";
import {getProfile} from "./userprofile/reducers";
import {taskReducer} from "./task/reducers";
import { reducer as formReducer } from 'redux-form'
import {assigneeReducer} from "./assignees/reducers";
import {messageReducer} from "./message_reducer";

export default combineReducers({
    form: formReducer,
    messageReducer,
    security: loginReducer,
    profile: getProfile,
    tasks:  tasksReducer,
    taskReducer,
   // saving: saveTaskReducer,
    assignees: assigneeReducer


})