import { GET_MESSAGES, SET_LOADING_MESSAGES,INITIAL_MESSAGES } from '../actions/types';

const initialState = {
  messages: [],
  loading: false,
  counter: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      let newMessages = [];
      action.payload.map(message => newMessages.push(message));
      return {
        ...state,
        messages: newMessages,
        loading: false,
        counter: state.counter + 1
      };
    case SET_LOADING_MESSAGES:
      return {
        ...state,
        loading: true
      }
    case INITIAL_MESSAGES:
      return {
        messages: [],
        loading: false,
        counter: 0
      };
    default:
      return { ...state };
  }
};
