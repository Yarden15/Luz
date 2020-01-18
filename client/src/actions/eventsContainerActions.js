import { GET_EVENTS, EVENT_ERROR, SET_LOADING } from './types';
import axios from 'axios';
import store from '../store';


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
  })
}
