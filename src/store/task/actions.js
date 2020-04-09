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
    console.log('request > ' + URL)
    connectSession.get(URL)
        .then(response => {
            console.log(response.data)
            dispatch(fetchTaskSuccess(response.data))
        })
        .catch(error => {
            console.log(error)
        })
}

export const saveTask = (task) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let jsonAsText = JSON.stringify(task);
    //let jsonAsText = "'Task':{" +  JSON.stringify(task) + "}";
    let URL = 'http://silverbox.example.com:8080/tasks/';
    console.log('request > ' + URL)
    console.log(task)
    connectSession.post(URL, jsonAsText)
        .then(response => {
            console.log(response.data)
            dispatch(fetchTaskSuccess(response.data))
        })
        .catch(error => {
            console.log(error)
        })
}

export const fetchTaskSuccess = serverPage => {
    return {
        type: GET_TASK,
        serverResponseData: serverPage
    }
}

