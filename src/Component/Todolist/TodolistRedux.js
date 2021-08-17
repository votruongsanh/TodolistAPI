import React, { useState, useEffect } from 'react';
import bgtodo from './bgtodo.png';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskApi, checkTaskApi, delTaskApi, getTaskListApi, rejectTaskAppi } from '../../redux/actions/TodolistAction';
import Loading from '../Loading/Loading';
import DateTime from '../DateTime/DateTime';

export default function TodolistRedux(props) {
    const { taskList } = useSelector(state => state.TodolistReducer);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        errors: {
            taskName: ''
        },
        values: {
            taskName: ''
        },
    });
    const handleChange = (e) => {
        let { name, value } = e.target;
        let newValues = { ...state.values };
        newValues = { ...newValues, [name]: value };
        let newErrors = { ...state.errors };
        let regexString = /^[a-z A-Z]+$/;
        if (!regexString.test(value) || value.trim() === "") {
            newErrors[name] = name + " invalid !";
        } else {
            newErrors[name] = "";
        }
        setState({
            ...state,
            values: newValues,
            errors: newErrors,
        });
    }
    const getTaskList = () => {
        dispatch(getTaskListApi());
    }
    useEffect(() => {
        getTaskList();
    }, []);
    const rendertaskTodo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }} >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        checkTask(item.taskName)
                    }} >
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    const rendertaskComplete = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }} >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        rejectTask(item.taskName)
                    }} >
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }
    const delTask = (taskname) => {
        dispatch(delTaskApi(taskname));
    }
    const checkTask = (taskname) => {
        dispatch(checkTaskApi(taskname));
    }
    const rejectTask = (taskname) => {
        dispatch(rejectTaskAppi(taskname));
    }

    const addtask = (e) => {
        e.preventDefault();
        console.log(state.values.taskName);
        if (state.values.taskName === "") {
            alert("please type taskName !");
        } else {
            dispatch(addTaskApi(state.values.taskName));
            state.values.taskName = "";
        }
    }

    return (
        <form onSubmit={addtask} className="card">
            <div className="card__header">
                <img src={bgtodo} alt="todolist" />
            </div>
            {/* <h2>hello!</h2> */}
            <div className="card__body" >
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        {/* <p>September 9,2020</p> */}
                        <DateTime />
                    </div>
                    <div className="card__add">
                        <input name="taskName" id="newTask" value={state.values.taskName} onChange={handleChange} type="text" placeholder="Enter an activity..." />
                        <button id="addItem" type="submit" onClick={addtask}><i className="fa fa-plus" /></button>
                    </div>
                    <p style={{ color: '#f44336' }}>{state.errors.taskName}</p>
                    <div id="notiInput" className="alert-danger" style={{ display: 'none' }} />
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {rendertaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed" >
                            {rendertaskComplete()}
                        </ul>
                    </div>
                </div>
            </div>
            <Loading />
        </form>
    )
}
