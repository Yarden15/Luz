import { GET_EVENTS, SET_LOADING, EVENT_ERROR, CREATE_DRAGGABLE} from './types';

import thunk from 'redux-thunk';

// const createEvent = () => {
//   const event
// }

// Get events form DataBase
export const getEvents = () => async dispatch => {
  try {
    //     setLoading();
    // const res = await fetch('/api/performances');
    // const data = await res.json();

    // Request to API get all events in DataBase
    const res = await axios.get('/api/timetable');

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: error.response.data
    });
  }
};

// //set loading to true
// export const setLoading = () => {
//   return {
//     type: SET_LOADING
//   }
// }

// export const creatDraggable = () => {
//   return {
//     type: CREATE_DRAGGABLE
//   }
// }

