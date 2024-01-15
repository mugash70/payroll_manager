// import { configureStore} from '@reduxjs/toolkit';
// import rootReducer from './reducers';
// const initialState = {};
// const store = configureStore({
//     reducer: rootReducer,
//     preloadedState: initialState,
// });

// export {store};
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

var initialState = {}

var middleware = [thunk]

var store = createStore(rootReducer, initialState,
    compose(
        applyMiddleware(...middleware)
        ,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

export {store}