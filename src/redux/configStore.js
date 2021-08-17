import { applyMiddleware, combineReducers, createStore } from 'redux';
import TodolistReducer from './reducers/TodolistReducer';
import reduxThunk from 'redux-thunk'

const rootReduccer = combineReducers({
    //nơi chứa reducer
    TodolistReducer,
})
const store = createStore(rootReduccer, applyMiddleware(reduxThunk));
export default store;