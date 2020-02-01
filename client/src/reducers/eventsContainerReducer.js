import { GET_EVENTS, SET_LOADING, EVENT_ERROR } from '../actions/types';

const initialState = {
  events: [],
  loading: false,
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
    default:
      return state;
  }
};
