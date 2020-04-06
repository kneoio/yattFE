import {LOGIN} from "../security/actions";

const defaultState = {
    credentials: {
        usr:'',
        pwd:''
    }
}


export const loginReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                serverPage: action.payload,
            }
            break;
        }
        default:
            return state;
    }

}
