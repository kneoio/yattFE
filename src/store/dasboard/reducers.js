import {GET_TASK, UPDATE_TASK} from "./actions";

const taskDefaultState = {
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
        actions: []
    }
}


export const taskReducer = (state = taskDefaultState, action) => {
    switch (action.type) {
        case GET_TASK: {
            return {
                identifier: action.serverPage.identifier,
                type: action.serverPage.type,
                pageName: action.serverPage.pageName,
                title: action.serverPage.title,
                payloads: {
                    task: action.serverPage.payloads.task,
                    actions: action.serverPage.payloads.actions,
                }
            }
            break;
        }
        case UPDATE_TASK: {
            return {
                identifier: action.serverPage.identifier,
                type: action.serverPage.type,
                pageName: action.serverPage.pageName,
                title: action.serverPage.title,
                payloads: {
                    task: action.serverPage.payloads.task,
                    actions: action.serverPage.payloads.actions,
                }
            }
            break;
        }
        default:
            return state;
    }
}



