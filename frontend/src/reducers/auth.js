import {CLEAR_MSG,AUTH_LOADING,CLEAR_AUTH,SUCCESS,FAIL} from '../actions/types'

var initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    isLoading:false,
    msg: null,
   
}

export default function Authreducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                isLoading:true,
                 [action.dataType]: {
                  ...state[action.dataType],
                  data: action.payload
                },
            }
        case SUCCESS:
            if (!action.payload) {return state}
            localStorage.setItem('token', action.payload.token)
            const { user, msg } = action.payload || {};
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                user: user,
                msg: msg || '',
            }
        case FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                isLoading: false,
                user: null
            }
       
        case CLEAR_AUTH:
          localStorage.clear();
    
          return initialState
        default:
            {
                return state
            }


    }
}