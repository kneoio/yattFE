import {GET_TASK, GET_TASKS, GETTING_TASKS_FAILURE} from "./actions";

const defaultState = {
    serverPage: {
        type:'',
        pageName:'',
        title:'',
        payload: {
            count: 0,
            pageSize: 20,
            pageNum: 0,
            result:[]
        }
    },
    error: ''
}

export const taskReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                serverPage: action.payload,
            }
            break;
        }
        case GET_TASK: {
            return {
                ...state,
                serverPage: action.payload,
            }
            break;
        }
        case GETTING_TASKS_FAILURE: {
            return {
                ...state,
                error: action.payload
            }
            break;
        }
        default:
            return state;
    }

}




