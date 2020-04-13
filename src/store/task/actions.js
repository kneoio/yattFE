import axios from 'axios';
import React from "react";

export const GET_TASK = "GET_TASK";

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
    connectSession.get(URL)
        .then(response => {
            console.log('a tasks =',response.data)
            //dispatch(fetchTaskSuccess(response.data))
            dispatch({type: GET_TASK, serverResponseData: response.data})
        })
        .catch(error => {
            console.log(error)
        })
}

export const saveTask = (task) => dispatch => {
    console.log('task to save=',task)
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let jsonAsText = JSON.stringify(task);
    //let jsonAsText = "'Task':{" +  JSON.stringify(task) + "}";
    let URL = 'http://silverbox.example.com:8080/tasks/';
    console.log('request > ' + URL)
    console.log(task)
    connectSession.post(URL, task)
        .then(response => {
            console.log('the task save result=',response.data)
            dispatch(fetchTaskSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status && (error.response.status === 400 || error.response.status === 500)){
                console.log(error.response.data);
                console.log(error.response.data.payload.debugMessage);
                debugger
                window.location.replace('/error/:' + error.response.data.payload.debugMessage);
            } else {
                console.log(error)
            }
            this.props.history.push("/home");
        })
}

export const fetchTaskSuccess = serverPage => {
    return {
        type: GET_TASK,
        serverResponseData: serverPage
    }
}

