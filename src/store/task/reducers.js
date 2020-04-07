import {GET_TASK} from "./actions";

const defaultState = {
    serverPage: {
        type:'',
        pageName:'',
        title:'',
        payload: {
            id: 0,
            author: 0,
            regDate: "",
            lastModifiedDate: "",
            title: '',
            type: "",
            status: "",
            stage: "",
            description: "",
            deadline: "",
            assignee: ""

        }
    },
    error: ''
}

export const taskReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case GET_TASK: {
            return {
                ...state,
                serverPage: action.serverResponseData,
            }
            break;
        }
        default:
            return state;
    }

}




