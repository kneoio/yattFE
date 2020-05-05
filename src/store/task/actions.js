import axios from 'axios';
import React from "react";
import {GET_TASKS} from "../tasks/actions";

export const GET_TASK = "GET_TASK";
export const SAVE_TASK_RESULT = "SAVE_TASK_RESULT";
export const VALIDATION_ERROR = "VALIDATION_ERROR";
export const INFO = "INFO";

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
            console.log('save result=', response.data)
            dispatch(saveTaskResult(response.data));
           // fetchTask(response.data.pageName);
            //this.props.history.push("/home");
        })
        .catch(error => {
            console.log('save error ',error)
            console.log('save error ',error.response.data)
            if (!error.isAxiosError) {
                if (error.response) {
                    if (error.response.status === 500) {
                        console.log(error.response.data);
                        dispatch(saveTaskResult(error.response.data));
                    } else {
                        console.log(error.response)
                    }
                } else {
                    console.log(error)
                }
            } else {
                if (error.response) {
                    if (error.response.data.type === VALIDATION_ERROR) {
                        dispatch(saveTaskResult(error.response.data));
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
            //this.props.history.push("/home");
        })
}

export const saveTaskResult = serverPage => {
    return {
        type: serverPage.type,
        serverResponseData: serverPage
    }
}

