import { GET_SCHEDULES, SET_LOADING, SCHEDULES_ERROR } from './types'
//import thunk from 'redux-thunk'
//get schedules from db
export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('schedules');
    const data = await res.json();

    dispatch({
      type: GET_SCHEDULES,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCHEDULES_ERROR,
      payload: error.response.data
    });
  }


};


//set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}