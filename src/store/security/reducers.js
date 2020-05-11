import {LOGIN} from "../security/actions";

const defaultState = {
    serverPage: {
        type: '',
        title: ''
    }
}

export const loginReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                serverPage: action.serverResponseData
            }
        }
        default:
            return state;
    }

}
