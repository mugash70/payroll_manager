import {CLEAR_MSG,LOADED,LOADED_FAIL,CLEAR_ALL,SET_LOADING,UPDATED,ADDED,DELETED} from '../actions/types'


var initialState = {
    isLoading: true,
    adjustments:[],
    organizations:[],
    entities:[],
    departments:[],
    grades:[],
    employees:[],
    transactions:[],
    transactionscompleted:[],
    msg:null,

}
export default function Allreducer(state = initialState, action) {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        };
      case LOADED:
        // const newData = Array.isArray(action.payload) ? action.payload : [];
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            data: action.payload
          },
          isLoading: false,
        };
      case DELETED:
        const deletedItemId = action.payload;
        const updatedDataAfterDelete = state[action.dataType].data.filter(item => item.id !== deletedItemId);
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            data: updatedDataAfterDelete,
          },
        };
        case ADDED:
          const { data, msg } = action.payload || {};
          const currentData = state[action.dataType]?.data || [];
          const newData = data ? [...currentData, data] : currentData;
          return {
              ...state,
              [action.dataType]: {
                  ...state[action.dataType],
                  data: newData,
              },
              msg: msg || '',
          };
    
        // const addedItem = action.payload;
        // return {
        //   ...state,
        //   [action.dataType]: {
        //     ...state[action.dataType],
        //     data: [...(state[action.dataType].data || []), addedItem],
        //   },
        //   msg: action.payload.msg || '',
        // };

      case UPDATED:
        const updatedItem = action.payload;
        const updatedData = state[action.dataType].data.map(item =>item.emp_id === updatedItem.emp_id ? { ...item, ...updatedItem } : item);
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            data: updatedData,
          },
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