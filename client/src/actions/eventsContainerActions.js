import {
  GET_EVENTS,
  SET_LOADING,
  EVENT_ERROR,
  CREATE_DRAGGABLE
} from './types';

import axios from 'axios';

import thunk from 'redux-thunk';
//get events from db
export const getEvents = () => async dispatch => {
  try {
    //     setLoading();
    const res = await fetch('schedules');
    const data = await res.json();

    // const config = {
    //   headers: {
    //     'x-auth-token':
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRlNzdmMTg2ZmQ1ZTEzNmU4YWY2ZjAwIn0sImlhdCI6MTU3ODgzMjU2NSwiZXhwIjoxNTc4ODY4NTY1fQ.CRhIQZESwo23e47A4PYlQdff00WGCXCHHclIsJ48QgQ'
    //   }
    // };
    // const res = await axios.get('/api/performances', config);
    // const data = await res.json();

    dispatch({
      type: GET_EVENTS,
      payload: data
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
