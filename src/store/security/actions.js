import axios from 'axios';

export const LOGIN = "LOGIN";

export const login = (login, password) => dispatch => {
    const formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    let URL = process.env.REACT_APP_REST_HOST + '/login';
    axios.post(URL, formData)
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

