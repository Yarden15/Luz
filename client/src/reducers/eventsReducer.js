import { GET_EVENTS, SET_LOADING, EVENT_ERROR, GET_COURSES, INITIAL_EVENT, SORT_COURSES, FILTER_EVENTS_BY_LOCATION, FILTER_EVENTS_BY_SEMESTER, FILTER_EVENTS_BY_YEAR, FILTER_EVENTS_BY_COURSE_TITLE, FILTER_EVENTS_BY_LAST_NAME, FILTER_EVENTS_BY_FIRST_NAME, DISPLAY_ALL_EVENTS } from '../actions/types';

const initialState = {
  events: [],
  displayEvents: [],
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
        displayEvents: newEvents,
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
    case DISPLAY_ALL_EVENTS:
      return {
        ...state,
        displayEvents: state.events
      };
    case FILTER_EVENTS_BY_FIRST_NAME:
      let filteredArray = state.displayEvents.filter((event) => { return !event.user.first_name.indexOf(action.payload) })
      return {
        ...state,
        displayEvents: filteredArray
      };
    case FILTER_EVENTS_BY_LAST_NAME:
      console.log(state.events)
      let filteredArrayLast = state.displayEvents.filter((event) => { return !event.user.last_name.indexOf(action.payload) })
      return {
        ...state,
        displayEvents: filteredArrayLast
      };
    case FILTER_EVENTS_BY_COURSE_TITLE:
      let filteredArrayTitle = state.displayEvents.filter((event) => { return !event.performance.title.indexOf(action.payload) })
      return {
        ...state,
        displayEvents: filteredArrayTitle
      };
    case FILTER_EVENTS_BY_YEAR:
      let filteredArrayYear = state.displayEvents.filter((event) => { return !event.performance.year.indexOf(action.payload) })
      return {
        ...state,
        displayEvents: filteredArrayYear
      };
    case FILTER_EVENTS_BY_SEMESTER:
      console.log(action.payload);
      let filteredArraySemester = state.displayEvents.filter((event) => { return event.performance.semester === action.payload })
      return {
        ...state,
        displayEvents: filteredArraySemester
      };
    case FILTER_EVENTS_BY_LOCATION:
      let filteredArrayLocation = state.displayEvents.filter((event) => { return !event.performance.location === action.payload })
      return {
        ...state,
        displayEvents: filteredArrayLocation
      };
    case "UPDATE_HOURS_REMAINING":
      let displayEventsUpdated = state.displayEvents;
      let eventsUpdated = state.events;
      eventsUpdated.forEach(event => {
        if (event._id === action.payload.timeTableId)
          event.course_hours_remaining = action.payload.timeStamp;
      });
      displayEventsUpdated.forEach(event => {
        if (event._id === action.payload.timeTableId)
          event.course_hours_remaining = action.payload.timeStamp;
      });
      return {
        ...state,
        events: eventsUpdated,
        displayEvents: displayEventsUpdated
      };
    case INITIAL_EVENT:
      return {
        events: [],
        displayEvents: [],
        users: [],
        courses: [],
        error: null
      };
    default:
      return state;
  }
};
