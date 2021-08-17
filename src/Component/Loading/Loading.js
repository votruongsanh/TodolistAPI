import React from 'react';
import imLoadinng from '../../assets/img/loading.gif';
import '../Todolist/todolist.css';
import { useSelector } from 'react-redux';

export default function Loading() {
    const { loading } = useSelector(state => state.TodolistReducer);
    
    if (!loading) { return null }

    return (
        <div className="container">
            <img src={imLoadinng} alt="loading" className="imgLoading" />
        </div>
    )
}
