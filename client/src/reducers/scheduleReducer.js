import { GET_SCHEDULES, SET_LOADING, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE, ADD_EVENT } from '../actions/types';

const initialState = {
  schedules: {},
  conunter: 0,
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
      let copyScheds = state.schedules;
      delete copyScheds[action.payload]
      let num = state.counter+1;
      return {
        ...state,
        schedules: copyScheds,
        counter: num
      }
    case ADD_EVENT:
      const copySchedss = state.schedules;
      copySchedss[action.payload.id].calendarRef.current.props.events.push(action.payload.event);
      return {
        ...state,
        schedules: copySchedss
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
      return state;
  }
}