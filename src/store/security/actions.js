import axios from 'axios';

export const LOGIN = "LOGIN";

export const login = (login, password) => dispatch => {
    let URL = 'http://silverbox.example.com:8080/do_login';
    console.log('request > ' + URL)
    axios.get(URL + "?usr=" + login + "&pwd=" + password)
        .then(response => {
            sessionStorage.setItem("jwtToken", response.headers.authorization);
            dispatch({
                type: LOGIN, serverResponseData: {
                    type: 'LOGIN_SUCCESS',
                    title: ''
                }
            })
            window.location.replace('/view/tasks');
        })
        .catch(error => {
                console.log("login fail")
                console.log(error)
                dispatch({
                        type: LOGIN,
                        serverResponseData: {
                            type: 'LOGIN_FAIL',
                            title: 'The server cause an error or out of the service'
                        }
                    }
                )
            }
        )

}

