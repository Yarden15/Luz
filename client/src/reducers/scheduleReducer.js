import { GET_SCHEDULES, SET_LOADING_SCHED, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE, ADD_EVENT, DELETE_EVENT, EVENT_CHANGED, CHANGE_LANG_SCHEDS, RENAME_SCHED, CLEAN_SCHEDULES,INITIAL_SCHEDULE, CLEAR_SCHEDULE, STOP_LOADING_SCHED, UPDATE_ERRORS_ARRAY, DELETE_FROM_ERRORS } from '../actions/types';
const initialState = {
  schedules: {},
  errorsEvents: [],
  counter: 0,
  current: null,
  loading: false
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
        schedules: { ...state.schedules, [action.payload.id]: action.payload },
        loading: false
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
      let newSchedule = state.schedules;
      newSchedule[action.payload.schedId].calendarRef.current.props.events.push(action.payload.event);
      return {
        ...state,
        schedules: newSchedule
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
      const id = (event) => event.eventId === action.payload.event_id;
      const index = copySchedsDeleteEvent[action.payload.sched_id].calendarRef.current.props.events.findIndex(id);
      if (index > -1)
        copySchedsDeleteEvent[action.payload.sched_id].calendarRef.current.props.events.splice(index, 1);
      return {
        ...state,
        schedules: copySchedsDeleteEvent
      }
    case SET_LOADING_SCHED:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_SCHED:
      return {
        ...state,
        loading: false
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CHANGE_LANG_SCHEDS:
      return {
        ...state,
        schedules: action.payload
      };
    case CLEAN_SCHEDULES:
      return {
        ...state,
        schedules: {},
        current: null,
        loading: false
      };
    case RENAME_SCHED:
      state.schedules[state.current].title = action.payload
      return {
        ...state,
        counter: state.counter + 1
      }
    case UPDATE_ERRORS_ARRAY:
      return {
        ...state,
        counter: state.counter + 1,
        errorsEvents: action.payload
      }
    case DELETE_FROM_ERRORS:
      let errorsArray = state.errorsEvents;
      for (let i = 0; i < state.errorsEvents.length; i++) {
        if (action.payload === state.errorsEvents[i].event.eventId)
          errorsArray.splice(i, 1)
      }
      return {
        ...state,
        counter: state.counter + 1,
        errorsEvents: errorsArray
      }
    case CLEAR_SCHEDULE:
      let schedToClear = state.schedules;
      let length = state.schedules[state.current].calendar.props.children.props.events.length;
      for (let i = 0; i < length; i++) {
        schedToClear[state.current].calendar.props.children.props.events.pop()
      }
      return {
        ...state,
        schedules: schedToClear
      }

    case INITIAL_SCHEDULE:
      return {
        schedules: {},
        counter: 0,
        current: null,
        loading: false,
        error: null
      };
    default:
      return { ...state };
  }
}

