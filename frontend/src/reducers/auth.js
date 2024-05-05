import {AUTH_LOADING,CLEAR_AUTH,SUCCESS,FAIL} from '../actions/types'

var initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    isLoading:true,
   
}

export default function Authreducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                 [action.dataType]: {
                  ...state[action.dataType],
                  data: action.payload,
    
                },
            }
        case SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
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