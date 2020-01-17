import { GET_EVENTS, EVENT_ERROR } from './types';
import axios from 'axios';
import store from '../store';


// Get events form DataBase
export const getEvents = async () => {
  console.log('on get events function');
  try {
    const res = await axios.get('/api/timetables');
    store.dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (error) {
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.response.data
    });
  }
};

//     setLoading();
    // const res = await fetch('/api/performances');
    // const data = await res.json();

    // Request to API get all events in DataBase