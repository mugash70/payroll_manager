import { findErrors } from './error'
import axios from 'axios';
import {LOADED_FAIL,LOADED,BASE_API_URL,SET_LOADING,DELETED,UPDATED,SET_SELECTED,SET_REMOVE,ADDED,SET_THEME} from './types'

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  isLoading,
});


// export const handleUpload = async (selectedImage) => {;
//   try {
//     const formData = new FormData();
//     formData.append('pic_url', selectedImage);
//     const response = await axios.post(`/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//     return response.data.imageUrl; 
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// };


// export const post_data = (type,postdata,path,types) => async dispatch => {
//   const config = { headers: { "Content-type": "application/json" } };
//     const body = JSON.stringify(postdata);
//     await axios.post(`${path}`, body, config)
//       .then((res) => {dispatch({ type: type, payload: res.data, dataType: types });})
//       .catch((err) => {dispatch(findErrors(err.response.data, err.response.status, 'LOADED_FAIL'));dispatch({ type: LOADED_FAIL })});
//   };



//   export const get_data = (path,types) =>async dispatch => {
//     await  axios.get(`${path}`)
//       .then(res => {console.log(res); dispatch({ type: LOADED, payload: res.data, dataType: types});})
//       .catch(err => {dispatch(findErrors(err.data, err.status, 'LOADED_FAIL'));dispatch({ type: LOADED_FAIL });});
//   };


//   export var update_data = (updatedata,path,types) =>async dispatch => {
//     var config = { headers: { "Content-type": "application/json" } }
//     var body = JSON.stringify(updatedata)
//     await  axios.put(`${path}`, body, config)
//         .then(res => dispatch({ type: UPDATED, payload: res.data,dataType: types }))
//         .catch(err => { dispatch(findErrors(err.data, err.status, 'LOADED_FAIL')); dispatch({ type: LOADED_FAIL }) })
// }

// export var del_data = (path,types) =>async dispatch => {
//     var config = { headers: { "Content-type": "application/json" } }
//     await  axios.delete(`${path}`,config)
//         .then(res => dispatch({ type: DELETED, payload: res.data ,dataType: types}))
//         .catch(err => { dispatch(findErrors(err.data, err.status, 'LOADED_FAIL')); dispatch({ type: LOADED_FAIL }) })
//   }
  

export const handleUpload = async (selectedImage) => {
  try {
    const formData = new FormData();
    formData.append('pic_url', selectedImage);
    const response = await axios.post(`${BASE_API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.imageUrl || ''; // Safely access imageUrl
  } catch (error) {
    console.error('Error uploading image:', error);
    return ''; // Return an empty string or handle accordingly
  }
};

// Post data
export const post_data = (type, postdata, path, types) => async dispatch => {
  const config = { headers: { "Content-type": "application/json" } };
  const body = JSON.stringify(postdata);

  try {
    const res = await axios.post(`${BASE_API_URL}${path}`, body, config);
    dispatch({ type, payload: res.data, dataType: types });
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
  }
};

// Get data
export const get_data = (path, types) => async dispatch => {
  try {
    const res = await axios.get(`${BASE_API_URL}${path}`);
    dispatch({ type: LOADED, payload: res.data, dataType: types });
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
  }
};

// Update data
export const update_data = (updatedata, path, types) => async dispatch => {
  const config = { headers: { "Content-type": "application/json" } };
  const body = JSON.stringify(updatedata);

  try {
    const res = await axios.put(`${BASE_API_URL}${path}`, body, config);
    dispatch({ type: UPDATED, payload: res.data, dataType: types });
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
  }
};

export const del_data = (path, types) => async dispatch => {
  const config = { headers: { "Content-type": "application/json" } };

  try {
    const res = await axios.delete(`${BASE_API_URL}${path}`, config);
    dispatch({ type: DELETED, payload: res.data, dataType: types });
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
  }
}



export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});
export const setSelected = (key, value) => ({
  type: SET_SELECTED,
  payload: { key, value },
});

export const setRemove = (key) => ({
  type: SET_REMOVE,
  payload: key,
});