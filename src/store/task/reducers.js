import {GET_TASK, INFO, SAVE_TASK_RESULT, SERVER_ERROR, UPDATE_TASK, VALIDATION_ERROR} from "./actions";

const taskDefaultState = {
    serverPage: {
        identifier: null,
        type: null,
        pageName: null,
        title: null,
        payloads: {
                task: {
                    id: null,
                    author: 0,
                    regDate: null,
                    lastModifiedDate: null,
                    title: "",
                    typeCode: 0,
                    statusCode: 0,
                    priorityCode: 0,
                    description: "",
                    deadline: null,
                    assignee: "",
                    fields: null,
                    acl: null,
                    errorFields: null
                },
                actions:  []
        }
    }
}



export const taskReducer = (state = taskDefaultState, action) => {
    switch (action.type) {
        case GET_TASK: {
            return {
                ...state,
                serverPage: action.serverPage
            }
            break;
        }
        case SAVE_TASK_RESULT: {
            return {
                ...state,
                serverPage: action.serverPage
            }
            break;
        }
        case UPDATE_TASK: {
            return {
                ...state,
                serverPage: action.serverResponseData
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
        case SERVER_ERROR: {
            return {
                ...state,
                serverPage: {
                   title: action.errorMessage
                }
            }
            break;
        }
        default:
            return state;
    }
}



