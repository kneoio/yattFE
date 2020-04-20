import {combineReducers} from "redux";
import { tasksReducer } from "./tasks/reducers"
import {loginReducer} from "./security/reducers";
import {getProfile} from "./userprofile/reducers";
import {saveTaskReducer, taskReducer} from "./task/reducers";
import { reducer as formReducer } from 'redux-form'
import {assigneeReducer} from "./assignees/reducers";

export default combineReducers({
    form: formReducer,
    security: loginReducer,
    profile: getProfile,
    tasks:  tasksReducer,
    servEntity: taskReducer,
    saving: saveTaskReducer,
    assignees: assigneeReducer


})