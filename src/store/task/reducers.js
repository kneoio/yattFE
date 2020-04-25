import {GET_TASK, SAVE_TASK_RESULT} from "./actions";

const taskDefaultState = {
    identifier: null,
    type: null,
    pageName: null,
    title: null,
    payload: {
        id: 0,
        author: 0,
        regDate: "",
        lastModifiedDate: "",
        title: "",
        type: "",
        status: "",
        stage: "",
        description: "",
        deadline: "",
        assignee: ""

    }
}

const taskSavingDefaultState = {
    identifier: null,
    type: null,
    pageName: null,
    title: null
}


export const taskReducer = (state = taskDefaultState, action) => {
    switch (action.type) {
        case GET_TASK: {
            return {
                ...state,
                identifier: action.serverResponseData.identifier,
                type: action.serverResponseData.type,
                title: action.serverResponseData.title,
                pageName: action.serverResponseData.pageName,
                payload: action.serverResponseData.payload
            }
            break;
        }
        default:
            return state;
    }
}

export const saveTaskReducer = (state = taskSavingDefaultState, action) => {
    switch (action.type) {
        case SAVE_TASK_RESULT: {
            return {
                ...state,
                identifier: action.serverResponseData.identifier,
                type: action.serverResponseData.type,
                title: action.serverResponseData.title
            }
            break;
        }
        default:
            return state;
    }
}




