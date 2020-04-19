import { GET_EVENTS, SET_LOADING, EVENT_ERROR, GET_COURSES, INITIAL_EVENT, SORT_COURSES } from '../actions/types';

const initialState = {
  events: [],
  users: [],
  courses: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      let newEvents = [];
      action.payload.map(event => newEvents.push(event));
      return {
        ...state,
        events: newEvents,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case EVENT_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_COURSES:
      let newCourses = [];
      action.payload.map(event => newCourses.push(event));
      return {
        ...state,
        courses: newCourses,
        loading: false
      };
    case SORT_COURSES:
      let newArray = state.courses;
      newArray.sort(action.payload)
      return {
        ...state,
        courses: newArray,
        loading: false
      }
    case INITIAL_EVENT:
      return {
        events: [],
        users: [],
        courses: [],
        error: null
      };
    default:
      return state;
  }
};
