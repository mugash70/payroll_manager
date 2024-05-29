import { findErrors } from './error'
import axios from 'axios';
import {LOADED_FAIL,LOADED,BASE_API_URL,SET_LOADING,DELETED,UPDATED,ADDED} from './types'

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  isLoading,
});


export const handleUpload = async (selectedImage) => {;
  try {
    const formData = new FormData();
    formData.append('pic_url', selectedImage);
    const response = await axios.post(`/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data.imageUrl; 
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


export const post_data = (type,postdata,path,types) => async dispatch => {
  const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(postdata);
    await axios.post(`${path}`, body, config)
      .then((res) => {dispatch({ type: type, payload: res.data, dataType: types });})
      .catch((err) => {dispatch(findErrors(err.response.data, err.response.status, 'LOADED_FAIL'));dispatch({ type: LOADED_FAIL })});
  };



  export const get_data = (path,types) =>async dispatch => {
    await  axios.get(`${path}`)
      .then(res => {console.log(res); dispatch({ type: LOADED, payload: res.data, dataType: types});})
      .catch(err => {dispatch(findErrors(err.data, err.status, 'LOADED_FAIL'));dispatch({ type: LOADED_FAIL });});
  };


  export var update_data = (updatedata,path,types) =>async dispatch => {
    var config = { headers: { "Content-type": "application/json" } }
    var body = JSON.stringify(updatedata)
    await  axios.put(`${path}`, body, config)
        .then(res => dispatch({ type: UPDATED, payload: res.data,dataType: types }))
        .catch(err => { dispatch(findErrors(err.data, err.status, 'LOADED_FAIL')); dispatch({ type: LOADED_FAIL }) })
}

export var del_data = (path,types) =>async dispatch => {
    var config = { headers: { "Content-type": "application/json" } }
    await  axios.delete(`${path}`,config)
        .then(res => dispatch({ type: DELETED, payload: res.data ,dataType: types}))
        .catch(err => { dispatch(findErrors(err.data, err.status, 'LOADED_FAIL')); dispatch({ type: LOADED_FAIL }) })
  }
  