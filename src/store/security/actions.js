import axios from 'axios';
export const LOGIN = "LOGIN";

export const login = (login, password) => dispatch => {
    let URL = 'http://silverbox.example.com:8080/do_login';
    console.log('request > ' + URL)
    axios.get(URL + "?usr=u&pwd=1")
        .then(response => {
            console.log("login success")
            sessionStorage.setItem("jwtToken", response.headers.authorization);
            dispatch({type: LOGIN, serverResponseData: "success"})
            window.location.replace('/home');
        })
        .catch(error => {
            console.log("login fail")
            console.log(error)
            dispatch({type: LOGIN, serverResponseData: "fail"})
        })
}

