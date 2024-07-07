import { SET_SELECTED,SET_REMOVE } from '../actions/types'

const initialState = {
    ent_id: null,
    org_id: null,
    emp_id: null,
    trans_id:null,
    msg: null,
   
}

const selectedReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SELECTED:
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
  
      case SET_REMOVE:
        return {
          ...state,
          [action.payload]: null,
        };
  
      default:
        return state;
    }
  };

export default selectedReducer;
