import { findErrors } from './error'
import axios from 'axios';
import {LOADED_FAIL,SELECTED_ENT,SELECTED_ORG,LOADED,BASE_API_URL,SET_LOADING,DELETED,UPDATED,SET_SELECTED,SET_REMOVE,ADDED,SET_THEME} from './types'

let token = localStorage.getItem('token') ? localStorage.getItem('token'):null
const config = { headers: { "Content-type": "application/json",
  ...(token && { "Authorization": `${token}` })  } };

  
export const setLoading = (isLoading) => ({type: SET_LOADING,isLoading});
export const selectedOrg = () => ({type: SELECTED_ORG});
export const selectedEnt = () => ({type: SELECTED_ENT});
 
export const handleUpload = async (selectedImage) => {
  try {
    const formData = new FormData();
    formData.append('pic_url', selectedImage);
    const response = await axios.post(`${BASE_API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.imageUrl || '';
  } catch (error) {
    console.error('Error uploading image:', error);
    return '';
  }
};

// Post data
export const post_data = (type, postdata, path, types) => async dispatch => {
  const body = JSON.stringify(postdata);
  try {
    const res = await axios.post(`${BASE_API_URL}${path}`, body,config);
    dispatch({ type, payload: res.data, dataType: types });
    return res;
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
    throw error;
  }
};

// Get data
export const get_data = (path, types) => async dispatch => {
  
  try {
    const res = await axios.get(`${BASE_API_URL}${path}`,config);
    dispatch({ type: LOADED, payload: res.data, dataType: types });
    return res;
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
    throw error;
  }
};

// Update data
export const update_data = (updatedata, path, types,key) => async dispatch => {
  const body = JSON.stringify(updatedata);

  try {
    const res = await axios.put(`${BASE_API_URL}${path}`, body, config);
    dispatch({ type: UPDATED, payload: res.data, dataType: types,key:key });
    return res;
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
    throw error;
  }
};

export const del_data = (path, types,key) => async dispatch => {
  try {
    const res = await axios.delete(`${BASE_API_URL}${path}`, config);
    dispatch({ type: DELETED, payload: res.data, dataType: types,key:key });
    return res;
  } catch (error) {
    const errorMsg = error.response?.data || 'Unknown error';
    const errorStatus = error.response?.status || 500;
    dispatch(findErrors(errorMsg, errorStatus, 'LOADED_FAIL'));
    dispatch({ type: LOADED_FAIL });
    throw error;
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