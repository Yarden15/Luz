import { GET_MESSAGES, SET_LOADING_MESSAGES } from '../actions/types';

const initialState = {
  messages: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      let newMessages = [];
      action.payload.map(message => newMessages.push(message));
      return {
        ...state,
        messages: newMessages,
        loading: false
      };
    case SET_LOADING_MESSAGES:
      return {
        ...state,
        loading: true
      }
    default:
      return { ...state };
  }
};
