import axios from 'axios';

export const GET_ASSIGNEES = "GET_ASSIGNEES";

export const fetchAssignees = (size, page) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    });
    let URL = process.env.REACT_APP_REST_HOST + '/assignees?pattern=OPTION';
    connectSession.get(URL)
        .then(response => {
            //console.log('assignee list response=',response.data)
            dispatch(fetchTasksSuccess(response.data))
        })
        .catch(error => {
            if (error) {
                console.log('error of ' + URL, error);
                if (error.response && error.response.status === 500) {
                    console.log('500');
                    console.log(error.response);
                } else {
                  //  window.location.replace('/sign_in');
                }
            }
            //window.location.replace('/error');
        })
}

export const fetchTasksSuccess = serverPage => {
    return {
        type: GET_ASSIGNEES,
        serverPage: serverPage
    }
}

