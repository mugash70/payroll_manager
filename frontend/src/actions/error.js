import { GET_ERRORS, CLEAR_ERRORS } from './types'

export var findErrors = (msg, status, id = null, ) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id },
    
    }
}

export var clearError = () => {
    return {
        type: CLEAR_ERRORS
    }
}