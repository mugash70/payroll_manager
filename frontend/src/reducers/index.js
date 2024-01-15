import { combineReducers } from 'redux';

import errorReducer from './error';
import Authreducer from './auth';
import Allreducer from './all'


 const rootReducer = combineReducers({
    error: errorReducer,
    auth:Authreducer,
    all:Allreducer,
})

export default rootReducer;