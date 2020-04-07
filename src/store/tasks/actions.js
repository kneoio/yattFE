import axios from 'axios';
import React from "react";

export const GET_TASKS = "GET_TASKS";
export const GETTING_TASKS_FAILURE = "GETTING_TASKS_FAILURE";

export const fetchTasks = (size, page) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = 'http://silverbox.example.com:8080/tasks?pageSize=' + size + '&pageNum=' + page;
    console.log('request > ' + URL)
    connectSession.get(URL)
        .then(response => {
            console.log(response.data)
            dispatch(fetchTasksSuccess(response.data))
        })
        .catch(error => {
            console.log(error.response);
            window.location.replace('/sign_in');
            dispatch(fetchTasksFailure(error))
        })
}

export const fetchTasksSuccess = serverPage => {
    return {
        type: GET_TASKS,
        serverResponseData: serverPage
    }
}

export const fetchTasksFailure = error => {
    return {
        type: GETTING_TASKS_FAILURE,
        serverResponseData: error
    }
}
