import {GET_ASSIGNEES} from "./actions";

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

export const assigneeReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ASSIGNEES: {
            return {
                ...state,
                serverPage: action.serverPage,
            }

        }
        default:
            return state;
    }
}




