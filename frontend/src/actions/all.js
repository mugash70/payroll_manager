import { findErrors } from './error'
import axios from 'axios';
import {LOADED_FAIL,LOADED,BASE_API_URL} from './types'

export const post_data = (postdata,path,types) => async(dispatch) => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(postdata);
    await axios.post(`${BASE_API_URL}${path}`, body, config)
      .then((res) => {dispatch({ type: LOADED, payload: res.data, dataType: types });})
      .catch((err) => {dispatch(findErrors(err.data, err.status, 'LOADED_FAIL'));dispatch({ type: LOADED_FAIL });});
  };
  export const get_data = (path,types) =>async dispatch => {
 
    await  axios.get(`${BASE_API_URL}${path}`)
      .then(res => {dispatch({ type: LOADED, payload: res.data, dataType: types});})
      .catch(err => {console.log(err);dispatch(findErrors(err.data, err.status, 'LOADED_FAIL'));dispatch({ type: LOADED_FAIL });});
  };
  export var update_data = (updatedata,path,types) =>async dispatch => {
    var config = { headers: { "Content-type": "application/json" } }
    var body = JSON.stringify(updatedata)

    await  axios.post(`${BASE_API_URL}${path}`, body, config)
        .then(res => dispatch({ type: LOADED, payload: res.data,dataType: types }))
        .catch(err => { dispatch(findErrors(err.data, err.status, 'LOADED_FAIL')); dispatch({ type: LOADED_FAIL }) })
}
export var del_data = (path,types) =>async dispatch => {
    var config = { headers: { "Content-type": "application/json" } }
    await  axios.post(`${BASE_API_URL}${path}`,config)
        .then(res => dispatch({ type: LOADED, payload: res.data ,dataType: types}))
        .catch(err => { dispatch(findErrors(err.data, err.status, 'LOADED_FAIL')); dispatch({ type: LOADED_FAIL }) })
  }
  