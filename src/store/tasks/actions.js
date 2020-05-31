import axios from 'axios';
import {viewErrorHandler} from "../actions_helper";

export const GET_TASKS = "GET_TASKS";

export const fetchTasks = (size, page) => dispatch => {
    const connectSession = axios.create({
        //timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = 'http://silverbox.example.com:8080/tasks?pageSize=' + size + '&pageNum=' + page;
    console.log('GET request > ' + URL)
    connectSession.get(URL)
        .then(response => {
            console.log('tasks list response=', response.data)
            dispatch(fetchTasksSuccess(response.data))
        }).catch(error => {
        viewErrorHandler(error, dispatch);
    })
}

export const deleteTasks = (ids) => dispatch => {
    const connectSession = axios.create({
        //timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = "http://silverbox.example.com:8080/tasks";
    console.log('DELETE request > ' + ids)
    connectSession.delete(URL,{params : {"ids": ids}})
        .then(response => {
            console.log('tasks list response=', response.data)
            dispatch(fetchTasksSuccess(response.data))
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
