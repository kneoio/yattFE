import axios from 'axios';
import {viewErrorHandler} from "../actions_helper";
import {INFO} from "../global_actions";
export const GET_TASKS = "GET_TASKS";

export const fetchTasks = (viewType, size, page) => dispatch => {

    const connectSession = axios.create({
        //timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = process.env.REACT_APP_REST_HOST + '/' + viewType + '?pageSize=' + size + '&pageNum=' + page;

    connectSession.get(URL)
        .then(response => {
            //console.log('tasks list response=', response.data)
            dispatch(fetchTasksSuccess(response.data))
        }).catch(error => {
        viewErrorHandler(error, dispatch);
    })
}

export const deleteTasks = (ids, viewType, size, page) => dispatch => {
    const connectSession = axios.create({
        //timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = process.env.REACT_APP_REST_HOST + "/tasks";
    console.log('DELETE request > ' +  URL);
    connectSession.delete(URL, {data : ids} )
        .then(response => {
            console.log('tasks list response=', response.data);
            dispatch(fetchTasks(viewType, size, page));
            dispatch({type: INFO, message: response.data});

        }).catch(error => {
            viewErrorHandler(error, dispatch);
        })
}


const fetchTasksSuccess = serverPage => {
    return {
        type: GET_TASKS,
        serverPage: serverPage
    }
}
