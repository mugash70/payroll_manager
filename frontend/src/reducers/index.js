import { combineReducers } from 'redux';

import errorReducer from './error';
import Authreducer from './auth';
import Allreducer from './all'
import themeReducer from './theme'
import selectedReducer from './selected'

 const rootReducer = combineReducers({
    error: errorReducer,
    auth:Authreducer,
    all:Allreducer,
    theme: themeReducer,
    user_selection:selectedReducer
})

export default rootReducer;