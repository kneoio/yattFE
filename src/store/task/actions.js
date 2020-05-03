import axios from 'axios';
import React from "react";

export const GET_TASK = "GET_TASK";
export const SAVE_TASK_RESULT = "SAVE_TASK_RESULT";

export const fetchTask = (id) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    console.log('request tasks =', id)
    let URL = 'http://silverbox.example.com:8080/tasks/' + id;
    connectSession.get(URL)
        .then(response => {
            console.log('a tasks =',response.data)
            dispatch({type: GET_TASK, serverResponseData: response.data})
        })
        .catch(error => {
            console.log(error)
        })
}

export const saveTask = (task) => dispatch => {
   // console.log('task to save=',task)
    const connectSession = axios.create({
        //timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = 'http://silverbox.example.com:8080/tasks/';
    connectSession.post(URL, task)
        .then(response => {
            console.log('the task save result=',response.data.pageName)
            dispatch(saveTaskResult(response.data));
            fetchTask(response.data.pageName);
            //this.props.history.push("/home");
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status && (error.response.status === 400 || error.response.status === 500)) {
                    console.log(error.response.data);
                    dispatch(saveTaskResult(error.response.data));
                } else {
                    console.log(error.response)
                }
            } else {
                console.log(error)
            }
            //this.props.history.push("/home");
        })
}

export const saveTaskResult = serverPage => {
    return {
        type: SAVE_TASK_RESULT,
        serverResponseData: serverPage
    }
}

