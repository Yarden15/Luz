import {
  GET_EVENTS,
  SET_LOADING,
  EVENT_ERROR,
  CREATE_DRAGGABLE
} from './types';

import thunk from 'redux-thunk';
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
// export const componentDidMount = () => {
//   let draggableEl = document.getElementById("external-events");
//   new Draggable(draggableEl, {
//     itemSelector: ".fc-event",
//     eventData: function (eventEl) {
//       let title = eventEl.getAttribute("title");
//       let id = eventEl.getAttribute("data");
//       return {
//         title,
//         id
//       }
//     }
//   });
// }
