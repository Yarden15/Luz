import { GET_SCHEDULES, SET_LOADING, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE } from '../actions/types';

const initialState = {
  schedules: {},
  events: {},
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
    console.log('create calendar ' + action.payload.id);
    return {
        ...state,
        current: action.payload.id,
        schedules: {...state.schedules,[action.payload.id] : action.payload}
      }
      case SELECT_CALENDAR:
        console.log('select calendar ' + action.payload);
        return {
          ...state,
          current: action.payload
        }
        case DELETE_SCHEDULE:
          let copyScheds = state.schedules;
          delete copyScheds[action.payload]
          return {
            ...state,
            schedules: copyScheds
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