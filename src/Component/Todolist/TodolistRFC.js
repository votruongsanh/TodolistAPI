import React, { useState, useEffect } from 'react';
import bgtodo from './bgtodo.png';
import axios from 'axios';

export default function TodolistRFC(props) {
    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: '',
        }
    });
    useEffect(() => {
        getTaskList()

    }, []);
    const getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then((result) => {
            setState({
                ...state,
                taskList: result.data
            })
        })
        promise.catch((err) => {
            console.log(err.response.data);
        })
    }
    const handleChange = (e) => {
        let { value, name } = e.target;
        let newValue = { ...state.values };
        newValue = { ...newValue, [name]: value };

        let newError = { ...state.errors };
        let regexTaskName = /^[a-z A-Z]+$/;
        if (!regexTaskName.test(value) || value.trim() === '') {
            newError[name] = name + 'invalid';
        } else {
            newError[name] = '';
        }

        setState({
            ...state,
            values: newValue,
            errors: newError
        })
    }
    const rendertaskTodo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
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
        return state.taskList.filter(item => item.status).map((item, index) => {
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
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskname}`,
            method: 'DELETE'
        });
        promise.then(rs => {
            alert(rs.data);
            getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);
        })
    }
    const checkTask = (taskname) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskname}`,
            method: 'PUT'
        });
        promise.then(rs => {
            alert(rs.data);
            getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);
        })
    }
    const rejectTask = (taskname) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskname}`,
            method: 'PUT'
        });
        promise.then(rs => {
            alert(rs.data);
            getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);
        })
    }

    const addtask = (e) => {
        e.preventDefault();
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: state.values.taskName }
        });
        promise.then(rs => {
            alert('addTask success !');
            getTaskList()
        })
        promise.catch(err => {
            alert(err.response.data);
        })

    }
    return (
        <div className="card">
            <div className="card__header">
                <img src={bgtodo} alt="todolist" />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addtask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input name="taskName" id="newTask" onChange={handleChange} type="text" placeholder="Enter an activity..." />
                        <button id="addItem" type="submit" onClick={addtask}>  
                            <i className="fa fa-plus" />
                        </button>
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
            </form>
        </div>
    )
}
