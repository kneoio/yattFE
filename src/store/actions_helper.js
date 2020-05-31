import {SERVER_ERROR, VALIDATION_ERROR} from "./global_actions";
import {SAVE_TASK_RESULT} from "./task/actions";
import {GET_TASKS} from "./tasks/actions";

export const viewErrorHandler = (error, dispatch) => {
    console.log("view error", error);
    if (!error.isAxiosError) {
        if (error.response) {
            if (error.response.status === 400 || error.response.status === 500) {
                console.log(error.response);
                if (error.response.data) {
                    dispatch({
                        type: GET_TASKS,
                        serverPage: error.response.data
                    })
                } else {
                    dispatch({
                            type: GET_TASKS,
                            serverResponseData: {
                                type: 'ERROR',
                                title: 'The server cause an error or out of the service'
                            }
                        }
                    )
                }
            } else {
                console.log("viewErrorHandler, error.response", error.response)
            }
        } else {
            console.log(error)
        }
    } else {
        if (error.response) {
            if (error.response.data.type === SERVER_ERROR) {
                dispatch({type: SERVER_ERROR, title: error.response.data});
            } else {
                console.log("http client:viewErrorHandler, error.response", error.response)
                dispatch({
                    type: SERVER_ERROR,
                    message: {
                        type: 'ERROR',
                        title: 'Unknown server error ' + error.response.status
                    }
                })
            }
        } else {
            dispatch({
                    type: SERVER_ERROR,
                    message: {
                        type: 'ERROR',
                        title: 'The server cause an error or out of the service'
                    }
                }
            )
        }
    }
}


export const errorHandler = (error, dispatch) => {
    console.log('save error ', error)
    if (!error.isAxiosError) {
        if (error.response) {
            if (error.response.status === 500) {
                console.log(error.response.data);
                dispatch({type: SERVER_ERROR, message: error.response.data});
            } else {
                console.log(error.response)
            }
        } else {
            console.log(error)
        }
    } else {
        if (error.response) {
            console.log("error.response", error.response)
            if (error.response.data.type === VALIDATION_ERROR) {
                dispatch({type: VALIDATION_ERROR, message: error.response.data});
            } else if (error.response.data.type === SERVER_ERROR) {
                dispatch({type: SERVER_ERROR, message: error.response.data});
            }
        } else {
            dispatch({
                    type: SAVE_TASK_RESULT,
                    serverResponseData: {
                        type: 'ERROR',
                        title: 'The server cause an error or out of the service'
                    }
                }
            )
        }
    }
}