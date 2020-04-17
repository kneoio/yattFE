import axios from 'axios';

export const GET_TASKS = "GET_TASKS";

export const fetchTasks = (size, page) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = 'http://silverbox.example.com:8080/tasks?pageSize=' + size + '&pageNum=' + page;
    console.log('request > ' + URL)
    connectSession.get(URL)
        .then(response => {
            console.log('tasks list response=',response.data)
            dispatch(fetchTasksSuccess(response.data))
        })
        .catch(error => {
            console.log(error);
            if (error.response && (error.response.status === 400 || error.response.status === 500)){
                console.log(error.response);
                if (error.response.data) {
                    dispatch(fetchTasksSuccess(error.response.data))
                } else {
                    dispatch({
                            type: GET_TASKS,
                            serverResponseData: {
                                type: 'ERROR',
                                title: 'The server cause an error or out of the service'
                            }
                        }
                    )
                }
            } else {
                window.location.replace('/sign_in');
            }
        })
}

export const fetchTasksSuccess = serverPage => {
    return {
        type: GET_TASKS,
        serverResponseData: serverPage
    }
}
