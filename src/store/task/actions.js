import axios from 'axios';

export const GET_TASKS = "GET_TASKS";
export const GETTING_TASKS_FAILURE = "GETTING_TASKS_FAILURE";

export const fetchTasks = (size, page) => dispatch => {
    let URL = 'http://localhost:8080/tasks?pageSize=' + size + '&pageNum=' + page;
    console.log('request > ' + URL)
    axios.get(URL)
        .then(response => {
            console.log(response.data)
            dispatch(fetchTasksSuccess(response.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchTasksFailure(error))
        })
}

export const fetchTasksSuccess = serverPage => {
    return {
        type: GET_TASKS,
        payload: serverPage
    }
}


export const fetchTasksFailure = error => {
    return {
        type: GETTING_TASKS_FAILURE,
        payload: error
    }
}