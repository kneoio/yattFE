import axios from 'axios';
import React from "react";

export const GET_TASKS = "GET_TASKS";
export const GET_TASK = "GET_TASK";
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
           // if (error.response.status === 401) {
                window.location.replace('/sign_in');
                //browserHistory.push('/sign_in')
            //} else {
                dispatch(fetchTasksFailure(error))
            //}
        })
}



export const fetchTask = (id) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = 'http://silverbox.example.com:8080/tasks/' + id;
    console.log('request > ' + URL)
    connectSession.get(URL)
        .then(response => {
            console.log(response.data)
            dispatch(fetchTaskSuccess(response.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchTasksFailure(error))
        })
}

export const fetchTasksSuccess = serverPage => {
    return {
        type: GET_TASKS,
        payload: serverPage
    }
}

export const fetchTaskSuccess = serverPage => {
    return {
        type: GET_TASK,
        payload: serverPage
    }
}

export const fetchTasksFailure = error => {
    return {
        type: GETTING_TASKS_FAILURE,
        payload: error
    }
}
