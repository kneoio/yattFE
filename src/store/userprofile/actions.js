import axios from 'axios';

export const GET_PROFILE = "GET_PROFILE";

export const getUserProfile = () => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = 'http://silverbox.example.com:8080/user_profile';
    console.log('request > ' + URL)
    connectSession.get(URL)
        .then(response => {
            console.log(response.data)
            dispatch(getProfile(response.data))
        })
        .catch(error => {
            console.log(error.response);
            window.location.replace('/error');
        })
}


export const getProfile = serverPage => {
    return {
        type: GET_PROFILE,
        payload: serverPage
    }
}


