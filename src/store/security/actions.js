import axios from 'axios';
import React from "react";
export const LOGIN = "LOGIN";

export const login = (login, password) => dispatch => {
    let URL = 'http://silverbox.example.com:8080/do_login';
    console.log('request > ' + URL)
    axios.get(URL + "?usr=u&pwd=1")
        .then(response => {
            console.log("login success")
            console.log(response.headers)
            sessionStorage.setItem("jwtToken", response.headers.authorization);
            window.location.replace('/home');
        })
        .catch(error => {
            console.log("login fail")
            console.log(error)
        })
}

const loginSuccess = serverPage => {
    return {
        type: LOGIN,
        serverResponseData: serverPage
    }
}


const loginFail = serverPage => {
    return {
        type: LOGIN,
        serverResponseData: serverPage
    }
}
