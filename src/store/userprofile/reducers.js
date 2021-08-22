import {GET_PROFILE} from "../userprofile/actions";

const defaultState = {
    user: {
        name:'',
        roles:''
    }
}


export const getProfile  = (state = defaultState, action) => {
    switch (action.type) {
        case GET_PROFILE: {
            return {
                ...state,
                serverPage: action.payload,
            }
        }
        default:
            return state;
    }

}
