import {GET_TASKS} from "./actions";

const defaultState = {
    serverPage: {
        type:'',
        pageName:'',
        title:'',
        payloads: {
            viewpage: {
                count: 0,
                pageSize: 20,
                pageNum: 0,
                result: []
            }
        }
    },
    error: ''
}

export const tasksReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                serverPage: action.serverPage,
            }
            break;
        }
        default:
            return state;
    }
}




