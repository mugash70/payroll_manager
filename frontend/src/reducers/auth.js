import {AUTH_LOADING,CLEAR_AUTH,SUCCESS,FAIL} from '../actions/types'

var initialState = {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    ent: localStorage.getItem('ent_id'),
    id: localStorage.getItem('id'),
    org_id: localStorage.getItem('org_id'),
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
                  data: action.payload
                },
            }
        case SUCCESS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('role', action.payload.user.role)
            localStorage.setItem('id', action.payload.user.id)
            localStorage.setItem('org_id', action.payload.user.org_id)
            localStorage.setItem('ent_id', action.payload.user.ent_id)
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