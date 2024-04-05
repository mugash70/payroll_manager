// import { configureStore} from '@reduxjs/toolkit';
// import rootReducer from './reducers';
// const initialState = {};
// const store = configureStore({
//     reducer: rootReducer,
//     preloadedState: initialState,
// });

// export {store};
// import { createStore, applyMiddleware, compose } from 'redux';
// import {thunk} from 'redux-thunk';
// import rootReducer from './reducers';

// var initialState = {}

// var middleware = [thunk]

// var store = createStore(rootReducer, initialState,
//     compose(
//         applyMiddleware(...middleware)
//         ,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ))

// export {store}

import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; 
import rootReducer from './reducers';

const persistedState = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export { store };

