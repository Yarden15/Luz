import { GET_EVENTS, EVENT_ERROR, SET_LOADING, REGISTER_FAIL } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import { displayAlert } from '../actions/authActions';


// Get events form DataBase
export const getEvents = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/timetables');
    store.dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (error) {
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.response.data
    });
  }
};

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING,
  });
};

export const createCourse = async FormData => {
  console.log(FormData);
  try {
    const res = await axios.post('/api/performances/', FormData);
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
    displayAlert();
  }
}
