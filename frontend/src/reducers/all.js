import {CLEAR_MSG,SELECTED_ORG,SELECTED_ENT,LOADED,LOADED_FAIL,CLEAR_ALL,SET_LOADING,UPDATED,ADDED,DELETED} from '../actions/types'


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
      case SELECTED_ENT:
        return {
          ...state,
          departments: [],
          grades: [],
          employees: [],
          transactions: [],
          adjustments: [],
          organizations: [],
          entities: [],
      };
      case SELECTED_ORG:
        return {
          ...state,
          entities: [],
      };
      case DELETED:
        const { payload: deletedItemId, dataType: deletedDataType, key: deleteKey } = action;
        const updatedDataAfterDelete = state[deletedDataType].data.filter(item => item[deleteKey] !== deletedItemId);
        return {
          ...state,
          [deletedDataType]: {
            ...state[deletedDataType],
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
    
          case UPDATED:
            const { payload: updatedItem, dataType, key } = action;
            const updatedData = state[dataType].data.map(item =>
              item[key] === updatedItem[key] ? { ...item, ...updatedItem } : item
            );
            return {
              ...state,
              [dataType]: {
                ...state[dataType],
                data: updatedData,
              },
            };
      // case UPDATED:
      //   const updatedItem = action.payload;
      //   const updatedData = state[action.dataType].data.map(item =>item.emp_id === updatedItem.emp_id ? { ...item, ...updatedItem } : item);
      //   return {
      //     ...state,
      //     [action.dataType]: {
      //       ...state[action.dataType],
      //       data: updatedData,
      //     },
      //   };
      
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