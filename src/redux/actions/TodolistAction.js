import axios from "axios";
import { GET_TASK_API, HIDE_LOADING, SHOW_LOADING } from "../constants/TodolistConst";

export const getTaskListApi = () => {
    return async dispatch => {
        try {
            dispatch(showLoading())
            let { data, status } = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
                dispatch(hideLoading());
            }
        } catch (err) {
            dispatch(hideLoading());
        }
    }
}
export const addTaskApi = (taskName) => {
    return dispatch => {
        dispatch(showLoading());
        return axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: taskName }
        })
        .then(rs => {
            dispatch(getTaskListApi());
            dispatch(hideLoading());
        })
        .catch(err => {
            alert(err.response.data);
            dispatch(hideLoading());
        })
    }
}
export const delTaskApi = (taskName) => {
    return dispatch => {
        dispatch(showLoading())
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
        promise.then(rs => {
            // alert(rs.data);
            dispatch(getTaskListApi());
            dispatch(hideLoading());
        })
        promise.catch(err => {
            console.log(err.response.data);
            dispatch(hideLoading());
        })
    }
}
export const checkTaskApi = (taskName) => {
    return dispatch => {
        dispatch(showLoading())
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(rs => {
            // alert(rs.data);
            dispatch(getTaskListApi());
            dispatch(hideLoading());
        })
        promise.catch(err => {
            console.log(err.response.data);
            dispatch(hideLoading());
        })
    }
}
export const rejectTaskAppi = (taskName) => {
    return dispatch => {
        dispatch(showLoading());
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(rs => {
            // alert(rs.data);
            dispatch(getTaskListApi());
            dispatch(hideLoading());
        })
        promise.catch(err => {
            console.log(err.response.data);
            dispatch(hideLoading());
        })
    }
}
export const showLoading = () => dispatch => {
    dispatch({ type: SHOW_LOADING });
}
export const hideLoading = () => dispatch => {
    dispatch({ type: HIDE_LOADING });
}