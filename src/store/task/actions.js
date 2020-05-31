import axios from 'axios';
import React from "react";
import {SERVER_ERROR, VALIDATION_ERROR} from "../global_actions";
export const GET_TASK = "GET_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
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
    let URL = 'http://silverbox.example.com:8080/tasks/' + id;
    connectSession.get(URL)
        .then(response => {
            console.log("response.data of Task",response.data)
            dispatch({type: GET_TASK, serverPage: response.data})
        })
        .catch(error => {
            console.log(error)
        })
}

export const saveTask = (task) => dispatch => {
    console.log('task to save=',task)
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
            dispatch({type: UPDATE_TASK, serverPage: response.data});
            dispatch({type: SAVE_TASK_RESULT, message: response.data});
        })
        .catch(error => {
            console.log('save error ',error)
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
                    console.log("error.response",error.response)
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
            //this.props.history.push("/home");
        })
}

