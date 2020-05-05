import {GET_TASK, INFO, SAVE_TASK_RESULT, VALIDATION_ERROR} from "./actions";

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
        assignee: "",
        fields: null
    }
}


const saveTaskDefaultState = {
    serverPage: {
        identifier: null,
        type: null,
        title: null,
        payload: {
            errorFields: null
        }
    }
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

export const saveTaskReducer = (state = saveTaskDefaultState, action) => {
    switch (action.type) {
        case SAVE_TASK_RESULT: {
            return {
                ...state,
                identifier: action.serverResponseData.identifier,
                type: action.serverResponseData.type,
                title: action.serverResponseData.title,
                payload: action.serverResponseData.payload
            }
            break;
        }
        case VALIDATION_ERROR: {
            return {
                ...state,
                serverPage: action.serverResponseData
            }
            break;
        }
        case INFO: {
            return {
                ...state,
                serverPage: action.serverResponseData
            }
            break;
        }
        default:
            return state;
    }
}




