import { GET_TASK_API, HIDE_LOADING, SHOW_LOADING } from "../constants/TodolistConst";

const initialState = {
    taskList: [],
    loading: false,
}

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_TASK_API: {
            state.taskList = action.taskList;
            return { ...state }
        }
        case SHOW_LOADING:{
            return {...state, loading: true}
        }
        case HIDE_LOADING:{
            return {...state, loading: false}
        }
        default:
            return state
    }
}
