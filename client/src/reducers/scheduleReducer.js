import { GET_SCHEDULES, SET_LOADING, SCHEDULE_ERROR, CREATE_CALENDAR } from '../actions/types';

const initialState = {
  schedules: [],
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
        schedules: state.schedules.concat(action.payload)
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