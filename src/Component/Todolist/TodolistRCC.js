import React, { Component } from 'react';
import './todolist.css';
import bgtodo from './bgtodo.png';
import axios from 'axios';

export default class TodolistRCC extends Component {

    state = {
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: '',
        }
    }
    componentDidMount() {
        this.getTaskList();
    }
    getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then((result) => {
            this.setState({
                ...this.state,
                taskList: result.data
            })
        })
        promise.catch((err) => {
            console.log(err.response.data);
        })
    }
    rendertaskTodo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        this.delTask(item.taskName)
                    }} >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        this.checkTask(item.taskName)
                    }} >
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    rendertaskComplete = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        this.delTask(item.taskName)
                    }} >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        this.rejectTask(item.taskName)
                    }} >
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }

    handleChange = (e) => {
        let { value, name } = e.target;
        let newValue = { ...this.state.values };
        newValue = { ...newValue, [name]: value };

        let newError = { ...this.state.errors };
        let regexTaskName = /^[a-z A-Z]+$/;
        if (!regexTaskName.test(value) || value.trim() === '') {
            newError[name] = name + 'invalid';
        } else {
            newError[name] = '';
        }

        this.setState({
            ...this.state,
            values: newValue,
            errors: newError
        })
    }
    addTask = (e) => {
        e.preventDefault();
        if (this.state.values === "") {
            alert("vui lòng nhập task");
            return;
        } else {
            let promise = axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: this.state.values.taskName }
            });
            promise.then(rs => {
                alert('addTask success !');
                this.getTaskList()
            })
            promise.catch(err => {
                alert(err.response.data);
            })
        }

    }
    delTask = (taskname) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskname}`,
            method: 'DELETE'
        });
        promise.then(rs => {
            alert(rs.data);
            this.getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);
        })
    }
    checkTask = (taskname) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskname}`,
            method: 'PUT'
        });
        promise.then(rs => {
            alert(rs.data);
            this.getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);
        })
    }
    rejectTask = (taskname) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskname}`,
            method: 'PUT'
        });
        promise.then(rs => {
            alert(rs.data);
            this.getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);
        })
    }

    render() {
        return (

            <div className="card" >
                <div className="card__header">
                    <img src={bgtodo} alt="todolist" />
                </div>
                {/* <h2>hello!</h2> */}
                <form onSubmit={this.addTask}>
                    <div className="card__body" >
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input name="taskName" id="newTask" onChange={this.handleChange} type="text" placeholder="Enter an activity..." />
                                <button id="addItem" type="submit" onClick={this.addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p style={{ color: '#f44336' }}>{this.state.errors.taskName}</p>

                            <div id="notiInput" className="alert-danger" style={{ display: 'none' }} />
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.rendertaskTodo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.rendertaskComplete()}
                                </ul>

                            </div>
                        </div>
                    </div>
                </form>
            </div >
        )
    }
}
