import {INFO, SERVER_ERROR, VALIDATION_ERROR} from "./global_actions";
import {SAVE_TASK_RESULT} from "./task/actions";

const defaultState = {
    identifier: null,
    type: null,
    pageName: null,
    title: null,
    payloads: {
        exception: {
            timestamp: null,
            message: ""
        }
    }
}


export const messageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case VALIDATION_ERROR: {
            return {
                identifier: action.message.identifier,
                type: action.message.type,
                pageName: action.message.pageName,
                title: action.message.title,
                payloads: action.message.payloads
            }
        }
        case INFO: {
            return {
                identifier: action.message.identifier,
                type: action.message.type,
                pageName: action.message.pageName,
                title: action.message.title,
                payloads: action.message.payloads
            }
        }
        case SERVER_ERROR: {
            return {
                identifier: action.message.identifier,
                type: action.message.type,
                pageName: action.message.pageName,
                title: action.message.title,
                payloads: action.message.payloads
            }
        }
        case SAVE_TASK_RESULT: {
            return {
                type: INFO,
                title: "task saved"
            }
        }
        default:
            return state;
    }
}



