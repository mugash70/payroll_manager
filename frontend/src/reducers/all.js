import {LOADED,LOADED_FAIL,CLEAR_ALL,SET_LOADING} from '../actions/types'


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
      case SET_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        };
      case LOADED:
        const newData = Array.isArray(action.payload) ? action.payload : [];
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            data: action.payload
          },
          isLoading: false,
        };
      case LOADED_FAIL:
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            data: [],
          },
          isLoading: false,
        };
      case CLEAR_ALL:
        return {initialState};
      default:
        return state;
    }
  }