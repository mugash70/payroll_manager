import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; 
import rootReducer from './reducers';
import { persistStore } from 'redux-persist';
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
const persistor = persistStore(store); 

export { store,persistor };

