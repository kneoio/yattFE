import {LOGIN} from "../security/actions";

const defaultState = {
    serverPage: {
        type: '',
        pageName: '',
        title: '',
        payload: null
    }
}

export const loginReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN: {
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
