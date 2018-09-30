import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,compose,applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import promiseMiddleware from 'redux-promise';
import { Provider } from 'react-redux';
import Reducer from './redux/reducers/index'
import Main from './App';
import './index.scss';

const store = createStore(
    combineReducers({
        ...Reducer,
    }),
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f=>f
    )
)


ReactDOM.render( 
    <Provider store={ store }>
        < Main / >
    </Provider>, document.getElementById('root'));