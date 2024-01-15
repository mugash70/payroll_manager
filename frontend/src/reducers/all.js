import {LOADED,LOADED_FAIL,CLEAR_ALL} from '../actions/types'


var initialState = {
    isLoading: true,
    bonusdeductions:[],
    organizations:[],
    entities:[],
    departments:[],
    grades:[],
    employees:[],
    transactions:[],
    transactionscompleted:[],
}
export default function Allreducer(state = initialState, action) {
    switch (action.type) {
      case LOADED:
        const newData = Array.isArray(action.payload) ? action.payload : [];
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            isLoading: false,
            data: action.payload
          },
        };
      case LOADED_FAIL:
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            isLoading: false,
            data: [],
          },
        };
      case CLEAR_ALL:
        return {initialState};
      default:
        return state;
    }
  }