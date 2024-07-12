import { combineReducers } from 'redux';

import errorReducer from './error';
import Authreducer from './auth';
import Allreducer from './all'
import themeReducer from './theme'
import selectedReducer from './selected'

 const appReducer = combineReducers({
    error: errorReducer,
    auth:Authreducer,
    all:Allreducer,
    theme: themeReducer,
    user_selection:selectedReducer
})
const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_AUTH') {
      state = undefined;
    }
    return appReducer(state, action);
  };
  

export default rootReducer;