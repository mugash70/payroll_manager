// import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; 
// import rootReducer from './reducers';
// import storage from 'redux-persist/lib/storage'; 
// import { persistStore, persistReducer } from 'redux-persist';

// // const persistConfig = localStorage.getItem('reduxState')  ? JSON.parse(localStorage.getItem('reduxState')): {};
// const persistConfig = {
//   key: 'root',
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const middleware = [thunk];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   // rootReducer,
//   persistedReducer,
//   composeEnhancers(
//     applyMiddleware(...middleware)
//   )
// );

// // store.subscribe(() => {
// //   localStorage.setItem('reduxState', JSON.stringify(store.getState()));
// // });
// const persistor = persistStore(store); 

// export { store,persistor };

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
