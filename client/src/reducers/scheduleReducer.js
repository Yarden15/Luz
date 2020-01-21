import { GET_SCHEDULES, SET_LOADING, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE, ADD_EVENT, DELETE_EVENT, EVENT_CHANGED } from '../actions/types';

const initialState = {
  schedules: {},
  counter: 0,
  current: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
        loading: false
      };
    case CREATE_CALENDAR:
      return {
        ...state,
        current: action.payload.id,
        schedules: { ...state.schedules, [action.payload.id]: action.payload }
      }
    case SELECT_CALENDAR:
      return {
        ...state,
        current: action.payload
      }
    case DELETE_SCHEDULE:
      delete state.schedules[action.payload]
      return {
        ...state,
        counter: state.counter + 1
      }
    case ADD_EVENT:
      state.schedules[action.payload.schedId].calendarRef.current.props.events.push(action.payload.event);
      return {
        ...state
      }
    case EVENT_CHANGED:
      state.schedules[action.payload.schedId].calendarRef.current.props.events.forEach(event => {
        if (event.eventId === action.payload.eventId) {
          event.endTime = action.payload.endTime;
          event.startTime = action.payload.startTime;
          event.daysOfWeek[0] = action.payload.daysOfWeek;
        }
      });
      return {
        ...state
      }
    case DELETE_EVENT:
      const copySchedsDeleteEvent = state.schedules;
      copySchedsDeleteEvent[action.payload.sched_id].calendarRef.current.props.events.pop(action.payload.event_id);
      return {
        ...state,
        schedules: copySchedsDeleteEvent
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SCHEDULE_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return { ...state };
  }
}